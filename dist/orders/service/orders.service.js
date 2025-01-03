"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let OrdersService = class OrdersService {
    constructor(orderModel, customerModel, inventoryModel) {
        this.orderModel = orderModel;
        this.customerModel = customerModel;
        this.inventoryModel = inventoryModel;
        this.logger = new common_1.Logger('OrderService');
    }
    async createOrder(createOrderDto) {
        const { customerId, items, totalAmount, status } = createOrderDto;
        const customer = await this.customerModel.findById(customerId);
        if (!customer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        let totalMarkedPrice = 0;
        const processedItems = await Promise.all(items.map(async ({ itemId, quantity }) => {
            const inventoryItem = await this.inventoryModel.findById(itemId);
            if (!inventoryItem) {
                throw new common_1.NotFoundException(`Item with ID ${itemId} not found`);
            }
            if (inventoryItem.quantity < quantity) {
                throw new common_1.BadRequestException(`Insufficient stock for item: ${inventoryItem.name} (ID: ${itemId})`);
            }
            inventoryItem.quantity -= quantity;
            await inventoryItem.save();
            totalMarkedPrice += inventoryItem.price * quantity;
            return { item: inventoryItem._id, quantity };
        }));
        const newOrder = new this.orderModel({
            customer: customer._id,
            items: processedItems,
            totalAmount,
            totalMarkedPrice,
            status: status || 'pending',
        });
        const savedOrder = await newOrder.save();
        customer.orders.push(savedOrder.id);
        await customer.save();
        return savedOrder;
    }
    async getAllOrders() {
        return this.orderModel.find().populate('customer items.item');
    }
    async getOrderById(id) {
        const order = await this.orderModel.findById(id).populate('customer items.item');
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        return order;
    }
    async updateOrder(id, updateOrderDto) {
        const updatedOrder = await this.orderModel.findByIdAndUpdate(id, { $set: updateOrderDto }, { new: true }).populate('customer items.item');
        if (!updatedOrder) {
            throw new common_1.NotFoundException('Order not found');
        }
        return updatedOrder;
    }
    async deleteOrder(id) {
        const order = await this.orderModel.findById(id);
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        await Promise.all(order.items.map(async ({ item, quantity }) => {
            const inventoryItem = await this.inventoryModel.findById(item);
            if (inventoryItem) {
                inventoryItem.quantity += quantity;
                await inventoryItem.save();
            }
        }));
        await this.orderModel.deleteOne({ _id: id });
        return { message: 'Order deleted and inventory restored' };
    }
    async cancelOrder(orderId) {
        const order = await this.orderModel.findById(orderId).populate('items.item');
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${orderId} not found`);
        }
        if (order.status === 'cancelled') {
            throw new common_1.BadRequestException('Order is already cancelled');
        }
        if (!order.inventoryRestored) {
            await Promise.all(order.items.map(async ({ item, quantity }) => {
                const inventoryItem = await this.inventoryModel.findById(item._id);
                if (!inventoryItem) {
                    throw new common_1.NotFoundException(`Inventory item with ID ${item._id} not found`);
                }
                inventoryItem.quantity += quantity;
                await inventoryItem.save();
            }));
            order.inventoryRestored = true;
        }
        order.status = 'cancelled';
        return order.save();
    }
    async calculateMonthlyStats() {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const endOfMonth = new Date(startOfMonth);
        if (startOfMonth.getMonth() === 11) {
            endOfMonth.setFullYear(startOfMonth.getFullYear() + 1);
            endOfMonth.setMonth(0);
        }
        else {
            endOfMonth.setMonth(startOfMonth.getMonth() + 1);
        }
        const monthlyOrders = await this.orderModel.find({
            createdAt: { $gte: startOfMonth, $lt: endOfMonth },
            inventoryRestored: false,
        });
        const totalAmount = monthlyOrders.reduce((sum, order) => sum + order.totalAmount, 0);
        const totalMarkedPrice = monthlyOrders.reduce((sum, order) => sum + order.totalMarkedPrice, 0);
        const revenue = totalAmount - totalMarkedPrice;
        const statusCounts = await this.orderModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfMonth, $lt: endOfMonth },
                },
            },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                },
            },
        ]);
        let completedOrders = 0;
        let pendingOrders = 0;
        let cancelledOrders = 0;
        statusCounts.forEach((stat) => {
            if (stat._id === 'completed')
                completedOrders = stat.count;
            if (stat._id === 'pending')
                pendingOrders = stat.count;
            if (stat._id === 'cancelled')
                cancelledOrders = stat.count;
        });
        const totalOrders = completedOrders + pendingOrders + cancelledOrders;
        return {
            totalAmount,
            totalMarkedPrice,
            revenue,
            totalOrders,
            completedOrders,
            pendingOrders,
            cancelledOrders,
        };
    }
    async getMonthlyTopProducts(month, year, limit = 10) {
        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 1);
        const topProducts = await this.orderModel.aggregate([
            {
                $match: {
                    orderDate: { $gte: startOfMonth, $lt: endOfMonth },
                    status: 'completed',
                },
            },
            { $unwind: '$items' },
            {
                $group: {
                    _id: '$items.item',
                    totalQuantity: { $sum: '$items.quantity' },
                },
            },
            {
                $lookup: {
                    from: 'inventories',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'productDetails',
                },
            },
            { $unwind: '$productDetails' },
            {
                $project: {
                    _id: 0,
                    productId: '$_id',
                    name: '$productDetails.name',
                    price: '$productDetails.price',
                    category: '$productDetails.category',
                    quantity: '$totalQuantity',
                },
            },
            { $sort: { quantity: -1 } },
            { $limit: limit },
        ]);
        return topProducts;
    }
    async getTodayOrderStats() {
        console.log("Entering getTodayOrderStats method");
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        try {
            const stats = await this.orderModel.aggregate([
                {
                    $match: {
                        createdAt: { $gte: startOfDay, $lt: endOfDay },
                    },
                },
                {
                    $group: {
                        _id: '$status',
                        count: { $sum: 1 },
                    },
                },
            ]);
            console.log("Stats aggregation result:", stats);
            const completedStats = await this.orderModel.aggregate([
                {
                    $match: {
                        createdAt: { $gte: startOfDay, $lt: endOfDay },
                        status: 'completed',
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalAmount: { $sum: '$totalAmount' },
                        totalMarkedPrice: { $sum: '$totalMarkedPrice' },
                    },
                },
            ]);
            console.log("Completed stats aggregation result:", completedStats);
            const totals = completedStats[0] || { totalAmount: 0, totalMarkedPrice: 0 };
            const revenue = totals.totalAmount - totals.totalMarkedPrice;
            const summary = {
                totalOrders: 0,
                completed: 0,
                cancelled: 0,
                pending: 0,
                totalAmount: totals.totalAmount,
                totalMarkedPrice: totals.totalMarkedPrice,
                revenue,
            };
            stats.forEach((stat) => {
                summary.totalOrders += stat.count;
                if (stat._id === 'completed')
                    summary.completed = stat.count;
                if (stat._id === 'cancelled')
                    summary.cancelled = stat.count;
                if (stat._id === 'pending')
                    summary.pending = stat.count;
            });
            console.log("Final Summary Object:", summary);
            return summary;
        }
        catch (error) {
            console.error("Error in getTodayOrderStats:", error);
            throw error;
        }
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Order')),
    __param(1, (0, mongoose_1.InjectModel)('Customer')),
    __param(2, (0, mongoose_1.InjectModel)('Inventory')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], OrdersService);
//# sourceMappingURL=orders.service.js.map
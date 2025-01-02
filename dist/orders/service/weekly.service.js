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
exports.WeeklyService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let WeeklyService = class WeeklyService {
    constructor(orderModel, customerModel, inventoryModel) {
        this.orderModel = orderModel;
        this.customerModel = customerModel;
        this.inventoryModel = inventoryModel;
    }
    async getWeeklyOrderStats() {
        const now = new Date();
        const startOfCurrentWeek = new Date(now);
        startOfCurrentWeek.setDate(now.getDate() - now.getDay());
        startOfCurrentWeek.setHours(0, 0, 0, 0);
        const endOfCurrentWeek = new Date(now);
        endOfCurrentWeek.setHours(23, 59, 59, 999);
        const startOfPreviousWeek = new Date(startOfCurrentWeek);
        startOfPreviousWeek.setDate(startOfPreviousWeek.getDate() - 7);
        const endOfPreviousWeek = new Date(startOfCurrentWeek);
        endOfPreviousWeek.setDate(endOfPreviousWeek.getDate() - 1);
        try {
            const previousWeekStats = await this.orderModel.findOne({
                createdAt: { $gte: startOfPreviousWeek, $lte: endOfPreviousWeek },
            }).exec();
            const startOfWeek = previousWeekStats ? startOfPreviousWeek : startOfCurrentWeek;
            const endOfWeek = previousWeekStats ? endOfPreviousWeek : endOfCurrentWeek;
            const stats = await this.orderModel.aggregate([
                {
                    $match: {
                        createdAt: { $gte: startOfWeek, $lte: endOfWeek },
                    },
                },
                {
                    $group: {
                        _id: '$status',
                        count: { $sum: 1 },
                    },
                },
            ]);
            const completedStats = await this.orderModel.aggregate([
                {
                    $match: {
                        createdAt: { $gte: startOfWeek, $lte: endOfWeek },
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
            const totals = completedStats[0] || { totalAmount: 0, totalMarkedPrice: 0 };
            const revenue = totals.totalAmount - totals.totalMarkedPrice;
            const summary = {
                week: previousWeekStats ? 'previous' : 'current',
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
            return summary;
        }
        catch (error) {
            console.error("Error in getWeeklyOrderStats:", error);
            throw error;
        }
    }
};
exports.WeeklyService = WeeklyService;
exports.WeeklyService = WeeklyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Order')),
    __param(1, (0, mongoose_1.InjectModel)('Customer')),
    __param(2, (0, mongoose_1.InjectModel)('Inventory')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], WeeklyService);
//# sourceMappingURL=weekly.service.js.map
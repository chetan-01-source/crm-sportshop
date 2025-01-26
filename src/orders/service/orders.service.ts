import { Injectable, NotFoundException, BadRequestException,Logger} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../schemas/order.schema';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Customer } from 'src/customer/schema/customer.schema';
import { Inventory } from 'src/inventory/schema/inventory.schema';

@Injectable()
export class OrdersService {

  private readonly logger = new Logger('OrderService');
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>, 
    @InjectModel('Customer') private readonly customerModel: Model<Customer>, 
    @InjectModel('Inventory') private readonly inventoryModel: Model<Inventory>, 
    
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { customerId, items, totalAmount, status } = createOrderDto;


    const customer = await this.customerModel.findById(customerId);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    let totalMarkedPrice = 0; 

 
    const processedItems = await Promise.all(
      items.map(async ({ itemId, quantity }) => {
        const inventoryItem = await this.inventoryModel.findById(itemId);
        if (!inventoryItem) {
          throw new NotFoundException(`Item with ID ${itemId} not found`);
        }

        if (inventoryItem.quantity < quantity) {
          throw new BadRequestException(
            `Insufficient stock for item: ${inventoryItem.name} (ID: ${itemId})`,
          );
        }

        
        inventoryItem.quantity -= quantity;
        await inventoryItem.save();

     
        totalMarkedPrice += inventoryItem.price * quantity;

        return { item: inventoryItem._id, quantity };
      }),
    );


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
  async getAllOrders(): Promise<Order[]> {
    return this.orderModel.find().populate('customer items.item');
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).populate('customer items.item');
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(
      id,
      { $set: updateOrderDto },
      { new: true },
    ).populate('customer items.item');

    if (!updatedOrder) {
      throw new NotFoundException('Order not found');
    }

    return updatedOrder;
  }

  async deleteOrder(id: string): Promise<{ message: string }> {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    await Promise.all(
      order.items.map(async ({ item, quantity }) => {
        const inventoryItem = await this.inventoryModel.findById(item);
        if (inventoryItem) {
          inventoryItem.quantity += quantity;
          await inventoryItem.save();
        }
      }),
    );

    await this.orderModel.deleteOne({ _id: id });

    return { message: 'Order deleted and inventory restored' };
  }

  async cancelOrder(orderId: string): Promise<Order> {
    const order = await this.orderModel.findById(orderId).populate('items.item');

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    if (order.status === 'cancelled') {
      throw new BadRequestException('Order is already cancelled');
    }

    if (!order.inventoryRestored) {
      await Promise.all(
        order.items.map(async ({ item, quantity }) => {
          const inventoryItem = await this.inventoryModel.findById(item._id);

          if (!inventoryItem) {
            throw new NotFoundException(`Inventory item with ID ${item._id} not found`);
          }

          inventoryItem.quantity += quantity; 
          await inventoryItem.save();
        }),
      );

      order.inventoryRestored = true;
    }

    order.status = 'cancelled';
    return order.save();
  }

 
  async calculateMonthlyStats(): Promise<{
    totalAmount: number;
    totalMarkedPrice: number;
    revenue: number;
    totalOrders: number;
    completedOrders: number;
    pendingOrders: number;
    cancelledOrders: number;
  }> {
    const startOfMonth = new Date();
    startOfMonth.setDate(1); 
    startOfMonth.setHours(0, 0, 0, 0); 

 
    const endOfMonth = new Date(startOfMonth);
    if (startOfMonth.getMonth() === 11) { 
        endOfMonth.setFullYear(startOfMonth.getFullYear() + 1);
        endOfMonth.setMonth(0);
    } else {
        endOfMonth.setMonth(startOfMonth.getMonth() + 1); 
    }

    const monthlyOrders = await this.orderModel.find({
        createdAt: { $gte: startOfMonth, $lt: endOfMonth },
        inventoryRestored: false, 
    });

  
    const totalAmount = monthlyOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalMarkedPrice = monthlyOrders.reduce(
        (sum, order) => sum + order.totalMarkedPrice,
        0,
    );
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
        if (stat._id === 'completed') completedOrders = stat.count;
        if (stat._id === 'pending') pendingOrders = stat.count;
        if (stat._id === 'cancelled') cancelledOrders = stat.count;
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
            if (stat._id === 'completed') summary.completed = stat.count;
            if (stat._id === 'cancelled') summary.cancelled = stat.count;
            if (stat._id === 'pending') summary.pending = stat.count;
        });

        console.log("Final Summary Object:", summary);
        return summary;

    } catch (error) {
        console.error("Error in getTodayOrderStats:", error);
        throw error;
    }
}



}
  


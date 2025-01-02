import { Injectable, NotFoundException, BadRequestException,Logger} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../schemas/order.schema';
import { Customer } from 'src/customer/schema/customer.schema';
import { Inventory } from 'src/inventory/schema/inventory.schema';


@Injectable()
export class WeeklyService {
    constructor(
        @InjectModel('Order') private readonly orderModel: Model<Order>, 
        @InjectModel('Customer') private readonly customerModel: Model<Customer>, 
        @InjectModel('Inventory') private readonly inventoryModel: Model<Inventory>, 
        
      ) {}
      async getWeeklyOrderStats(): Promise<any> {
        // Calculate the current week's start and end dates
        const now = new Date();
        const startOfCurrentWeek = new Date(now);
        startOfCurrentWeek.setDate(now.getDate() - now.getDay()); // Start of the current week (Sunday)
        startOfCurrentWeek.setHours(0, 0, 0, 0); // Start of day
        
        const endOfCurrentWeek = new Date(now);
        endOfCurrentWeek.setHours(23, 59, 59, 999); // End of the current day
        
        // Calculate the previous week's start and end dates
        const startOfPreviousWeek = new Date(startOfCurrentWeek);
        startOfPreviousWeek.setDate(startOfPreviousWeek.getDate() - 7); // Go back 7 days
        
        const endOfPreviousWeek = new Date(startOfCurrentWeek);
        endOfPreviousWeek.setDate(endOfPreviousWeek.getDate() - 1); // One day before current week start
        
        try {
          // Check if data exists for the previous week
          const previousWeekStats = await this.orderModel.findOne({
            createdAt: { $gte: startOfPreviousWeek, $lte: endOfPreviousWeek },
          }).exec();
      
          // If no data for previous week, adjust to use current week stats
          const startOfWeek = previousWeekStats ? startOfPreviousWeek : startOfCurrentWeek;
          const endOfWeek = previousWeekStats ? endOfPreviousWeek : endOfCurrentWeek;
      
          // Aggregation to get order counts grouped by status
          const stats = await this.orderModel.aggregate([
            {
              $match: {
                createdAt: { $gte: startOfWeek, $lte: endOfWeek },
              },
            },
            {
              $group: {
                _id: '$status', // Group by order status
                count: { $sum: 1 }, // Count orders
              },
            },
          ]);
      
          // Aggregation to calculate totals for completed orders
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
      
          // Extract totals or default to 0 if no completed orders exist
          const totals =
            completedStats[0] || { totalAmount: 0, totalMarkedPrice: 0 };
          const revenue = totals.totalAmount - totals.totalMarkedPrice;
      
          // Format the results into a summary object
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
      
          // Map the counts to the summary
          stats.forEach((stat) => {
            summary.totalOrders += stat.count; // Update total order count
            if (stat._id === 'completed') summary.completed = stat.count;
            if (stat._id === 'cancelled') summary.cancelled = stat.count;
            if (stat._id === 'pending') summary.pending = stat.count;
          });
      
          return summary;
        } catch (error) {
          console.error("Error in getWeeklyOrderStats:", error);
          throw error;
        }
      }
      
      
}

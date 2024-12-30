// src/monthly-archive/monthly-archive.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MonthlyArchive } from '../schemas/monthly-archive.schema';
import { Cron } from '@nestjs/schedule';
import { OrdersService } from '../service/orders.service';
import * as regression from 'regression';

@Injectable()
export class MonthlyArchiveService {
  constructor(
    @InjectModel('MonthlyArchive') private readonly archiveModel: Model<MonthlyArchive>,
    private readonly ordersService: OrdersService,
  ) {}

  @Cron('* * * * *') // Runs at midnight on the 1st of each month
  async generateMonthlyArchive() {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    lastMonth.setDate(1);
    lastMonth.setHours(0, 0, 0, 0);

    const nextMonth = new Date(lastMonth);
    nextMonth.setMonth(lastMonth.getMonth() + 1);

    const month = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`;

    // Calculate the monthly stats from OrdersService
    const {
      totalAmount,
      totalMarkedPrice,
      revenue,
      totalOrders,
      completedOrders,
      pendingOrders,
      cancelledOrders,
    } = await this.ordersService.calculateMonthlyStats();

    // Archive the data
    await this.addMonthlyData({
      month,
      totalAmount,
      totalMarkedPrice,
      revenue,
      totalOrders,
      completedOrders,
      pendingOrders,
      cancelledOrders,
    });
  }

  async addMonthlyData(data: {
    month: string;
    totalAmount: number;
    totalMarkedPrice: number;
    revenue: number;
    totalOrders: number;
    completedOrders: number;
    pendingOrders: number;
    cancelledOrders: number;
  }) {
    // Add the new monthly data
    await this.archiveModel.create(data);

    // Rotate archives to keep only the last 12 months
    const archiveCount = await this.archiveModel.countDocuments();
    if (archiveCount > 12) {
      const oldestRecord = await this.archiveModel.findOne().sort({ month: 1 }); // Find the oldest record
      if (oldestRecord) {
        await this.archiveModel.deleteOne({ _id: oldestRecord._id }); // Delete the oldest record
      }
    }
  }

  async getLast12MonthsData(): Promise<MonthlyArchive[]> {
    return this.archiveModel
      .find()
      .sort({ month: -1 }) // Sort by month descending
      .limit(12); // Return the last 12 months' data
  }
  private prepareData(archives: MonthlyArchive[], field: string) {
    return archives.map((item, index) => [index + 1, item[field]]);
  }

  // Train the linear regression model and predict the next value
  private async trainAndPredict(archives: MonthlyArchive[], field: string) {
    const data = this.prepareData(archives, field);

    // Perform linear regression using the regression library
    const result = regression.linear(data);

    // Predict the next month's value (next index = archives.length + 1)
    const prediction = result.predict(archives.length + 1);

    return prediction[1]; // Return the predicted value
  }

  // Forecast totalAmount for the next month
  async predictTotalAmount() {
    const archives = await this.archiveModel.find().sort({ month: -1 }).limit(12); // Get last 12 months data
    if (archives.length === 0) {
      throw new Error('Not enough data to make predictions');
    }
    return await this.trainAndPredict(archives, 'totalAmount');
  }

  // Forecast totalMarkedPrice for the next month
  async predictTotalMarkedPrice() {
    const archives = await this.archiveModel.find().sort({ month: -1 }).limit(12);
    if (archives.length === 0) {
      throw new Error('Not enough data to make predictions');
    }
    return await this.trainAndPredict(archives, 'totalMarkedPrice');
  }

  // Forecast revenue for the next month
  async predictRevenue() {
    const archives = await this.archiveModel.find().sort({ month: -1 }).limit(12);
    if (archives.length === 0) {
      throw new Error('Not enough data to make predictions');
    }
    return await this.trainAndPredict(archives, 'revenue');
  }

  // Forecast totalOrders for the next month
  async predictTotalOrders() {
    const archives = await this.archiveModel.find().sort({ month: -1 }).limit(12);
    if (archives.length === 0) {
      throw new Error('Not enough data to make predictions');
    }
    return await this.trainAndPredict(archives, 'totalOrders');
  }

  // Forecast completedOrders for the next month
  async predictCompletedOrders() {
    const archives = await this.archiveModel.find().sort({ month: -1 }).limit(12);
    if (archives.length === 0) {
      throw new Error('Not enough data to make predictions');
    }
    return await this.trainAndPredict(archives, 'completedOrders');
  }

  // Forecast pendingOrders for the next month
  async predictPendingOrders() {
    const archives = await this.archiveModel.find().sort({ month: -1 }).limit(12);
    if (archives.length === 0) {
      throw new Error('Not enough data to make predictions');
    }
    return await this.trainAndPredict(archives, 'pendingOrders');
  }

  // Forecast cancelledOrders for the next month
  async predictCancelledOrders() {
    const archives = await this.archiveModel.find().sort({ month: -1 }).limit(12);
    if (archives.length === 0) {
      throw new Error('Not enough data to make predictions');
    }
    return await this.trainAndPredict(archives, 'cancelledOrders');
  }

  // Forecast for all fields
  async forecastAll() {
    return {
      totalAmount: await this.predictTotalAmount(),
      totalMarkedPrice: await this.predictTotalMarkedPrice(),
      revenue: await this.predictRevenue(),
      totalOrders: await this.predictTotalOrders(),
      completedOrders: await this.predictCompletedOrders(),
      pendingOrders: await this.predictPendingOrders(),
      cancelledOrders: await this.predictCancelledOrders(),
    };
  }
}

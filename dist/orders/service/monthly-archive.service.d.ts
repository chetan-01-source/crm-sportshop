import { Model } from 'mongoose';
import { MonthlyArchive } from '../schemas/monthly-archive.schema';
import { OrdersService } from '../service/orders.service';
export declare class MonthlyArchiveService {
    private readonly archiveModel;
    private readonly ordersService;
    constructor(archiveModel: Model<MonthlyArchive>, ordersService: OrdersService);
    generateMonthlyArchive(): Promise<void>;
    addMonthlyData(data: {
        month: string;
        totalAmount: number;
        totalMarkedPrice: number;
        revenue: number;
        totalOrders: number;
        completedOrders: number;
        pendingOrders: number;
        cancelledOrders: number;
    }): Promise<void>;
    getLast12MonthsData(): Promise<MonthlyArchive[]>;
    private prepareData;
    private trainAndPredict;
    predictTotalAmount(): Promise<any>;
    predictTotalMarkedPrice(): Promise<any>;
    predictRevenue(): Promise<any>;
    predictTotalOrders(): Promise<any>;
    predictCompletedOrders(): Promise<any>;
    predictPendingOrders(): Promise<any>;
    predictCancelledOrders(): Promise<any>;
    forecastAll(): Promise<{
        totalAmount: any;
        totalMarkedPrice: any;
        revenue: any;
        totalOrders: any;
        completedOrders: any;
        pendingOrders: any;
        cancelledOrders: any;
    }>;
}

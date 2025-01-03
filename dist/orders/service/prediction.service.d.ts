import { HttpService } from '@nestjs/axios';
export declare class PredictionService {
    private readonly httpService;
    constructor(httpService: HttpService);
    private fetchMonthlyStats;
    private prepareData;
    private trainAndPredict;
    predictTotalAmount(): Promise<number>;
    predictTotalMarkedPrice(): Promise<number>;
    predictRevenue(): Promise<number>;
    predictTotalOrders(): Promise<number>;
    predictCompletedOrders(): Promise<number>;
    predictPendingOrders(): Promise<number>;
    predictCancelledOrders(): Promise<number>;
    predictFutureStats(): Promise<{
        totalAmount: number;
        totalMarkedPrice: number;
        revenue: number;
        totalOrders: number;
        completedOrders: number;
        pendingOrders: number;
        cancelledOrders: number;
    }>;
}

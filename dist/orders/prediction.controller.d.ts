import { PredictionService } from './service/prediction.service';
export declare class PredictionController {
    private readonly predictionService;
    constructor(predictionService: PredictionService);
    getFutureStats(): Promise<{
        totalAmount: number;
        totalMarkedPrice: number;
        revenue: number;
        totalOrders: number;
        completedOrders: number;
        pendingOrders: number;
        cancelledOrders: number;
    }>;
}

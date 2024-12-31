import { MonthlyArchiveService } from './service/monthly-archive.service';
export declare class MonthlyArchiveController {
    private readonly archiveService;
    constructor(archiveService: MonthlyArchiveService);
    predictAll(): Promise<{
        totalAmount: any;
        totalMarkedPrice: any;
        revenue: any;
        totalOrders: any;
        completedOrders: any;
        pendingOrders: any;
        cancelledOrders: any;
    }>;
    getLast12Months(): Promise<import("./schemas/monthly-archive.schema").MonthlyArchive[]>;
    getArchiveByMonth(month: string): Promise<import("./schemas/monthly-archive.schema").MonthlyArchive>;
}

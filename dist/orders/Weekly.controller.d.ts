import { WeeklyService } from './service/weekly.service';
export declare class WeeklyController {
    private readonly weeklyService;
    constructor(weeklyService: WeeklyService);
    getWeeklyStats(): Promise<any>;
}

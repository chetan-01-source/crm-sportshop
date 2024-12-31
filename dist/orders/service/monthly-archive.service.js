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
exports.MonthlyArchiveService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schedule_1 = require("@nestjs/schedule");
const orders_service_1 = require("../service/orders.service");
const regression = require("regression");
let MonthlyArchiveService = class MonthlyArchiveService {
    constructor(archiveModel, ordersService) {
        this.archiveModel = archiveModel;
        this.ordersService = ordersService;
    }
    async generateMonthlyArchive() {
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        lastMonth.setDate(1);
        lastMonth.setHours(0, 0, 0, 0);
        const nextMonth = new Date(lastMonth);
        nextMonth.setMonth(lastMonth.getMonth() + 1);
        const month = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`;
        const { totalAmount, totalMarkedPrice, revenue, totalOrders, completedOrders, pendingOrders, cancelledOrders, } = await this.ordersService.calculateMonthlyStats();
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
    async addMonthlyData(data) {
        await this.archiveModel.create(data);
        const archiveCount = await this.archiveModel.countDocuments();
        if (archiveCount > 12) {
            const oldestRecord = await this.archiveModel.findOne().sort({ month: 1 });
            if (oldestRecord) {
                await this.archiveModel.deleteOne({ _id: oldestRecord._id });
            }
        }
    }
    async getLast12MonthsData() {
        return this.archiveModel
            .find()
            .sort({ month: -1 })
            .limit(12);
    }
    prepareData(archives, field) {
        return archives.map((item, index) => [index + 1, item[field]]);
    }
    async trainAndPredict(archives, field) {
        const data = this.prepareData(archives, field);
        const result = regression.linear(data);
        const prediction = result.predict(archives.length + 1);
        return prediction[1];
    }
    async predictTotalAmount() {
        const archives = await this.archiveModel.find().sort({ month: -1 }).limit(12);
        if (archives.length === 0) {
            throw new Error('Not enough data to make predictions');
        }
        return await this.trainAndPredict(archives, 'totalAmount');
    }
    async predictTotalMarkedPrice() {
        const archives = await this.archiveModel.find().sort({ month: -1 }).limit(12);
        if (archives.length === 0) {
            throw new Error('Not enough data to make predictions');
        }
        return await this.trainAndPredict(archives, 'totalMarkedPrice');
    }
    async predictRevenue() {
        const archives = await this.archiveModel.find().sort({ month: -1 }).limit(12);
        if (archives.length === 0) {
            throw new Error('Not enough data to make predictions');
        }
        return await this.trainAndPredict(archives, 'revenue');
    }
    async predictTotalOrders() {
        const archives = await this.archiveModel.find().sort({ month: -1 }).limit(12);
        if (archives.length === 0) {
            throw new Error('Not enough data to make predictions');
        }
        return await this.trainAndPredict(archives, 'totalOrders');
    }
    async predictCompletedOrders() {
        const archives = await this.archiveModel.find().sort({ month: -1 }).limit(12);
        if (archives.length === 0) {
            throw new Error('Not enough data to make predictions');
        }
        return await this.trainAndPredict(archives, 'completedOrders');
    }
    async predictPendingOrders() {
        const archives = await this.archiveModel.find().sort({ month: -1 }).limit(12);
        if (archives.length === 0) {
            throw new Error('Not enough data to make predictions');
        }
        return await this.trainAndPredict(archives, 'pendingOrders');
    }
    async predictCancelledOrders() {
        const archives = await this.archiveModel.find().sort({ month: -1 }).limit(12);
        if (archives.length === 0) {
            throw new Error('Not enough data to make predictions');
        }
        return await this.trainAndPredict(archives, 'cancelledOrders');
    }
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
};
exports.MonthlyArchiveService = MonthlyArchiveService;
__decorate([
    (0, schedule_1.Cron)('* * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MonthlyArchiveService.prototype, "generateMonthlyArchive", null);
exports.MonthlyArchiveService = MonthlyArchiveService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('MonthlyArchive')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        orders_service_1.OrdersService])
], MonthlyArchiveService);
//# sourceMappingURL=monthly-archive.service.js.map
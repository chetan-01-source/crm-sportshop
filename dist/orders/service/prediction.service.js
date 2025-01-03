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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictionService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const regression = require("regression");
let PredictionService = class PredictionService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async fetchMonthlyStats() {
        const response = await this.httpService
            .get('https://electric-tobi-narendra-sports-cc3e2da4.koyeb.app/orders/stats/monthly')
            .toPromise();
        console.log(response.data);
        return response.data;
    }
    prepareData(data, field) {
        return data.map((item, index) => [index + 1, item[field]]);
    }
    async trainAndPredict(data, field) {
        const preparedData = this.prepareData(data, field);
        const result = regression.linear(preparedData);
        const prediction = result.predict(data.length + 1);
        return prediction[1];
    }
    async predictTotalAmount() {
        const data = await this.fetchMonthlyStats();
        if (data.length === 0) {
            throw new Error('Not enough data to make predictions');
        }
        return await this.trainAndPredict(data, 'totalAmount');
    }
    async predictTotalMarkedPrice() {
        const data = await this.fetchMonthlyStats();
        if (data.length === 0) {
            throw new Error('Not enough data to make predictions');
        }
        return await this.trainAndPredict(data, 'totalMarkedPrice');
    }
    async predictRevenue() {
        const data = await this.fetchMonthlyStats();
        if (data.length === 0) {
            throw new Error('Not enough data to make predictions');
        }
        return await this.trainAndPredict(data, 'revenue');
    }
    async predictTotalOrders() {
        const data = await this.fetchMonthlyStats();
        if (data.length === 0) {
            throw new Error('Not enough data to make predictions');
        }
        return await this.trainAndPredict(data, 'totalOrders');
    }
    async predictCompletedOrders() {
        const data = await this.fetchMonthlyStats();
        if (data.length === 0) {
            throw new Error('Not enough data to make predictions');
        }
        return await this.trainAndPredict(data, 'completedOrders');
    }
    async predictPendingOrders() {
        const data = await this.fetchMonthlyStats();
        if (data.length === 0) {
            throw new Error('Not enough data to make predictions');
        }
        return await this.trainAndPredict(data, 'pendingOrders');
    }
    async predictCancelledOrders() {
        const data = await this.fetchMonthlyStats();
        if (data.length === 0) {
            throw new Error('Not enough data to make predictions');
        }
        return await this.trainAndPredict(data, 'cancelledOrders');
    }
    async predictFutureStats() {
        const [totalAmount, totalMarkedPrice, revenue, totalOrders, completedOrders, pendingOrders, cancelledOrders] = await Promise.all([
            this.predictTotalAmount(),
            this.predictTotalMarkedPrice(),
            this.predictRevenue(),
            this.predictTotalOrders(),
            this.predictCompletedOrders(),
            this.predictPendingOrders(),
            this.predictCancelledOrders(),
        ]);
        return {
            totalAmount: Math.round(totalAmount),
            totalMarkedPrice: Math.round(totalMarkedPrice),
            revenue: Math.round(revenue),
            totalOrders: Math.round(totalOrders),
            completedOrders: Math.round(completedOrders),
            pendingOrders: Math.round(pendingOrders),
            cancelledOrders: Math.round(cancelledOrders),
        };
    }
};
exports.PredictionService = PredictionService;
exports.PredictionService = PredictionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], PredictionService);
//# sourceMappingURL=prediction.service.js.map
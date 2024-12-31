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
exports.MonthlyArchiveController = void 0;
const common_1 = require("@nestjs/common");
const monthly_archive_service_1 = require("./service/monthly-archive.service");
let MonthlyArchiveController = class MonthlyArchiveController {
    constructor(archiveService) {
        this.archiveService = archiveService;
    }
    async predictAll() {
        const predictions = await this.archiveService.forecastAll();
        return predictions;
    }
    async getLast12Months() {
        return this.archiveService.getLast12MonthsData();
    }
    async getArchiveByMonth(month) {
        const data = await this.archiveService.getLast12MonthsData();
        return data.find((archive) => archive.month === month);
    }
};
exports.MonthlyArchiveController = MonthlyArchiveController;
__decorate([
    (0, common_1.Get)('next-month'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MonthlyArchiveController.prototype, "predictAll", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MonthlyArchiveController.prototype, "getLast12Months", null);
__decorate([
    (0, common_1.Get)(':month'),
    __param(0, (0, common_1.Param)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MonthlyArchiveController.prototype, "getArchiveByMonth", null);
exports.MonthlyArchiveController = MonthlyArchiveController = __decorate([
    (0, common_1.Controller)('monthly-archives'),
    __metadata("design:paramtypes", [monthly_archive_service_1.MonthlyArchiveService])
], MonthlyArchiveController);
//# sourceMappingURL=monthly-archive.controller.js.map
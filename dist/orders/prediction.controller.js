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
exports.PredictionController = void 0;
const common_1 = require("@nestjs/common");
const prediction_service_1 = require("./service/prediction.service");
let PredictionController = class PredictionController {
    constructor(predictionService) {
        this.predictionService = predictionService;
    }
    async getFutureStats() {
        return await this.predictionService.predictFutureStats();
    }
};
exports.PredictionController = PredictionController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PredictionController.prototype, "getFutureStats", null);
exports.PredictionController = PredictionController = __decorate([
    (0, common_1.Controller)('predictions'),
    __metadata("design:paramtypes", [prediction_service_1.PredictionService])
], PredictionController);
//# sourceMappingURL=prediction.controller.js.map
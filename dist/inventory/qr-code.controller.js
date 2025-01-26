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
exports.QrCodeController = void 0;
const common_1 = require("@nestjs/common");
const qr_code_service_1 = require("./qr-code.service");
let QrCodeController = class QrCodeController {
    constructor(qrCodeService) {
        this.qrCodeService = qrCodeService;
    }
    async generateQrCodePdf(id, res) {
        try {
            const pdfBuffer = await this.qrCodeService.generateQrCodePdf(id);
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="qr-code-${id}.pdf"`,
            });
            res.send(pdfBuffer);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.QrCodeController = QrCodeController;
__decorate([
    (0, common_1.Get)(':id/pdf'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QrCodeController.prototype, "generateQrCodePdf", null);
exports.QrCodeController = QrCodeController = __decorate([
    (0, common_1.Controller)('qr-code'),
    __metadata("design:paramtypes", [qr_code_service_1.QrCodeService])
], QrCodeController);
//# sourceMappingURL=qr-code.controller.js.map
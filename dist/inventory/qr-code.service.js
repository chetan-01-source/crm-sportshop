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
exports.QrCodeService = void 0;
const common_1 = require("@nestjs/common");
const QRCode = require("qrcode");
const PDFDocument = require("pdfkit");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let QrCodeService = class QrCodeService {
    constructor(inventoryModel) {
        this.inventoryModel = inventoryModel;
    }
    async generateQrCodePdf(id) {
        const inventory = await this.inventoryModel.findById(id);
        if (!inventory) {
            throw new common_1.HttpException('Inventory item not found', common_1.HttpStatus.NOT_FOUND);
        }
        const qrCodeDataUrl = await QRCode.toDataURL(id);
        const pdfBuffer = await this.createPdfWithQrCode(qrCodeDataUrl, inventory);
        return pdfBuffer;
    }
    async createPdfWithQrCode(qrCodeDataUrl, inventory) {
        const doc = new PDFDocument();
        const chunks = [];
        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('end', () => Promise.resolve());
        doc.fontSize(20).text('Product QR Code', { align: 'center' });
        doc.moveDown();
        doc.fontSize(16).text(`Name: ${inventory.name}`, { align: 'center' });
        doc.text(`Price: $${inventory.price}`, { align: 'center' });
        doc.text(`Category: ${inventory.category}`, { align: 'center' });
        doc.moveDown();
        const qrCodeSize = 250;
        const pageWidth = doc.page.width;
        const offset = (pageWidth - qrCodeSize) / 2;
        doc.image(qrCodeDataUrl, offset, doc.y, { width: qrCodeSize, height: qrCodeSize });
        doc.end();
        return new Promise((resolve) => {
            doc.on('end', () => resolve(Buffer.concat(chunks)));
        });
    }
};
exports.QrCodeService = QrCodeService;
exports.QrCodeService = QrCodeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Inventory')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], QrCodeService);
//# sourceMappingURL=qr-code.service.js.map
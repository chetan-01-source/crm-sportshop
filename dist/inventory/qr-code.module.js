"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QrCodeModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const qr_code_controller_1 = require("./qr-code.controller");
const qr_code_service_1 = require("./qr-code.service");
const inventory_schema_1 = require("./schema/inventory.schema");
let QrCodeModule = class QrCodeModule {
};
exports.QrCodeModule = QrCodeModule;
exports.QrCodeModule = QrCodeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Inventory', schema: inventory_schema_1.InventorySchema }]),
        ],
        controllers: [qr_code_controller_1.QrCodeController],
        providers: [qr_code_service_1.QrCodeService],
    })
], QrCodeModule);
//# sourceMappingURL=qr-code.module.js.map
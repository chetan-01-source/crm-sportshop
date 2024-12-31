"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonthlyArchiveModule = void 0;
const common_1 = require("@nestjs/common");
const monthly_archive_service_1 = require("./service/monthly-archive.service");
const monthly_archive_controller_1 = require("./monthly-archive.controller");
const mongoose_1 = require("@nestjs/mongoose");
const monthly_archive_schema_1 = require("./schemas/monthly-archive.schema");
const orders_module_1 = require("../orders/orders.module");
let MonthlyArchiveModule = class MonthlyArchiveModule {
};
exports.MonthlyArchiveModule = MonthlyArchiveModule;
exports.MonthlyArchiveModule = MonthlyArchiveModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'MonthlyArchive', schema: monthly_archive_schema_1.MonthlyArchiveSchema }]),
            orders_module_1.OrdersModule,
        ],
        providers: [monthly_archive_service_1.MonthlyArchiveService],
        controllers: [monthly_archive_controller_1.MonthlyArchiveController],
    })
], MonthlyArchiveModule);
//# sourceMappingURL=monthly-archive.module.js.map
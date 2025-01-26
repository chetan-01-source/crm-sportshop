"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const customer_module_1 = require("./customer/customer.module");
const inventory_module_1 = require("./inventory/inventory.module");
const orders_module_1 = require("./orders/orders.module");
const schedule_1 = require("@nestjs/schedule");
const monthly_archive_module_1 = require("./orders/monthly-archive.module");
const core_1 = require("@nestjs/core");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const Weekly_module_1 = require("./orders/Weekly.module");
const qr_code_module_1 = require("./inventory/qr-code.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI),
            auth_module_1.AuthModule,
            customer_module_1.CustomerModule,
            inventory_module_1.InventoryModule,
            orders_module_1.OrdersModule,
            schedule_1.ScheduleModule.forRoot(),
            monthly_archive_module_1.MonthlyArchiveModule,
            Weekly_module_1.WeeklyModule,
            qr_code_module_1.QrCodeModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, core_1.Reflector],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
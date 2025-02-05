"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeeklyModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const order_schema_1 = require("./schemas/order.schema");
const customer_schema_1 = require("../customer/schema/customer.schema");
const inventory_schema_1 = require("../inventory/schema/inventory.schema");
const Weekly_controller_1 = require("./Weekly.controller");
const weekly_service_1 = require("./service/weekly.service");
let WeeklyModule = class WeeklyModule {
};
exports.WeeklyModule = WeeklyModule;
exports.WeeklyModule = WeeklyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Order', schema: order_schema_1.OrderSchema },
                { name: 'Customer', schema: customer_schema_1.CustomerSchema },
                { name: 'Inventory', schema: inventory_schema_1.InventorySchema },
            ]),
        ],
        controllers: [Weekly_controller_1.WeeklyController],
        providers: [weekly_service_1.WeeklyService],
        exports: [weekly_service_1.WeeklyService],
    })
], WeeklyModule);
//# sourceMappingURL=Weekly.module.js.map
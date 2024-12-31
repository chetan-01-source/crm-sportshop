"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonthlyArchiveSchema = void 0;
const mongoose_1 = require("mongoose");
exports.MonthlyArchiveSchema = new mongoose_1.Schema({
    month: { type: String, required: true, unique: true },
    totalAmount: { type: Number, required: true },
    totalMarkedPrice: { type: Number, required: true },
    revenue: { type: Number, required: true },
    totalOrders: { type: Number, required: true },
    completedOrders: { type: Number, required: true },
    pendingOrders: { type: Number, required: true },
    cancelledOrders: { type: Number, required: true },
});
//# sourceMappingURL=monthly-archive.schema.js.map
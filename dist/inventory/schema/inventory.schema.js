"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventorySchema = void 0;
const mongoose_1 = require("mongoose");
exports.InventorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    qrCode: { type: Buffer, required: false },
    lowStockThreshold: { type: Number, default: 5 },
}, {
    timestamps: true,
});
//# sourceMappingURL=inventory.schema.js.map
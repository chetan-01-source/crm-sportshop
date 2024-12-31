"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CustomerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: false },
    address: { type: String, required: false },
    orders: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'Order',
            required: false,
        },
    ],
}, { timestamps: true });
//# sourceMappingURL=customer.schema.js.map
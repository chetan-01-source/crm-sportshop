// src/monthly-archive/schema/monthly-archive.schema.ts
import { Schema, Document } from 'mongoose';

export const MonthlyArchiveSchema = new Schema({
  month: { type: String, required: true, unique: true }, // e.g., "2024-12"
  totalAmount: { type: Number, required: true },
  totalMarkedPrice: { type: Number, required: true },
  revenue: { type: Number, required: true },
  totalOrders: { type: Number, required: true }, // Total number of orders placed
  completedOrders: { type: Number, required: true }, // Number of completed orders
  pendingOrders: { type: Number, required: true }, // Number of pending orders
  cancelledOrders: { type: Number, required: true }, // Number of canceled orders
});

export interface MonthlyArchive extends Document {
  month: string;
  totalAmount: number;
  totalMarkedPrice: number;
  revenue: number;
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  cancelledOrders: number;
}

import { Schema, Document } from 'mongoose';

// Define the Inventory interface
 interface Inventory extends Document {
  name: string;
  category: string;
  price: number;
  quantity: number;
  qrCode?: Buffer; // Updated to represent QR code as a binary buffer
  lowStockThreshold: number; // New property to indicate low stock threshold
}
export { Inventory };
// Define the Inventory schema
export const InventorySchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    qrCode: { type: Buffer, required: false }, // Optional field to store QR code binary data
    lowStockThreshold: { type: Number, default: 5 }, // Default threshold is 5
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  },
);

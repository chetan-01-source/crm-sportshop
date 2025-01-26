import { Schema, Document } from 'mongoose';
interface Inventory extends Document {
    name: string;
    category: string;
    price: number;
    quantity: number;
    qrCode?: Buffer;
    lowStockThreshold: number;
}
export { Inventory };
export declare const InventorySchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    category: string;
    price: number;
    quantity: number;
    lowStockThreshold: number;
    qrCode?: Buffer<ArrayBufferLike>;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    category: string;
    price: number;
    quantity: number;
    lowStockThreshold: number;
    qrCode?: Buffer<ArrayBufferLike>;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    category: string;
    price: number;
    quantity: number;
    lowStockThreshold: number;
    qrCode?: Buffer<ArrayBufferLike>;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;

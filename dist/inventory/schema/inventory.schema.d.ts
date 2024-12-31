import { Schema, Document } from 'mongoose';
export interface Inventory extends Document {
    name: string;
    category: string;
    price: number;
    quantity: number;
    lowStockThreshold: number;
}
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
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    category: string;
    price: number;
    quantity: number;
    lowStockThreshold: number;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    category: string;
    price: number;
    quantity: number;
    lowStockThreshold: number;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;

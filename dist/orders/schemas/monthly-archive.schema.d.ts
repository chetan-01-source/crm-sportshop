import { Schema, Document } from 'mongoose';
export declare const MonthlyArchiveSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    totalAmount: number;
    totalMarkedPrice: number;
    revenue: number;
    totalOrders: number;
    completedOrders: number;
    pendingOrders: number;
    cancelledOrders: number;
    month: string;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    totalAmount: number;
    totalMarkedPrice: number;
    revenue: number;
    totalOrders: number;
    completedOrders: number;
    pendingOrders: number;
    cancelledOrders: number;
    month: string;
}>> & import("mongoose").FlatRecord<{
    totalAmount: number;
    totalMarkedPrice: number;
    revenue: number;
    totalOrders: number;
    completedOrders: number;
    pendingOrders: number;
    cancelledOrders: number;
    month: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
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

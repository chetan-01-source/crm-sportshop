import { Schema, Document, Types } from 'mongoose';
export declare const CustomerSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    email: string;
    orders: {
        prototype?: Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        createFromBase64?: {};
        isValid?: {};
    }[];
    phone?: string;
    address?: string;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    email: string;
    orders: {
        prototype?: Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        createFromBase64?: {};
        isValid?: {};
    }[];
    phone?: string;
    address?: string;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    email: string;
    orders: {
        prototype?: Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        createFromBase64?: {};
        isValid?: {};
    }[];
    phone?: string;
    address?: string;
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export interface Customer extends Document {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    orders: Types.ObjectId[];
}

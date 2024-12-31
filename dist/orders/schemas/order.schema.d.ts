import mongoose, { Document } from 'mongoose';
export declare class Order extends Document {
    customer: mongoose.Types.ObjectId;
    items: {
        item: mongoose.Types.ObjectId;
        quantity: number;
    }[];
    totalAmount: number;
    totalMarkedPrice: number;
    status: string;
    inventoryRestored: boolean;
    orderDate: Date;
}
export declare const OrderSchema: mongoose.Schema<Order, mongoose.Model<Order, any, any, any, mongoose.Document<unknown, any, Order> & Order & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Order, mongoose.Document<unknown, {}, mongoose.FlatRecord<Order>> & mongoose.FlatRecord<Order> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

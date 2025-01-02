import { Model } from 'mongoose';
import { Order } from '../schemas/order.schema';
import { Customer } from 'src/customer/schema/customer.schema';
import { Inventory } from 'src/inventory/schema/inventory.schema';
export declare class WeeklyService {
    private readonly orderModel;
    private readonly customerModel;
    private readonly inventoryModel;
    constructor(orderModel: Model<Order>, customerModel: Model<Customer>, inventoryModel: Model<Inventory>);
    getWeeklyOrderStats(): Promise<any>;
}

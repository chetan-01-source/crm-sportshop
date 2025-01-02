import { Model } from 'mongoose';
import { Order } from '../schemas/order.schema';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Customer } from 'src/customer/schema/customer.schema';
import { Inventory } from 'src/inventory/schema/inventory.schema';
export declare class OrdersService {
    private readonly orderModel;
    private readonly customerModel;
    private readonly inventoryModel;
    private readonly logger;
    constructor(orderModel: Model<Order>, customerModel: Model<Customer>, inventoryModel: Model<Inventory>);
    createOrder(createOrderDto: CreateOrderDto): Promise<Order>;
    getAllOrders(): Promise<Order[]>;
    getOrderById(id: string): Promise<Order>;
    updateOrder(id: string, updateOrderDto: UpdateOrderDto): Promise<Order>;
    deleteOrder(id: string): Promise<{
        message: string;
    }>;
    cancelOrder(orderId: string): Promise<Order>;
    calculateMonthlyStats(): Promise<{
        totalAmount: number;
        totalMarkedPrice: number;
        revenue: number;
        totalOrders: number;
        completedOrders: number;
        pendingOrders: number;
        cancelledOrders: number;
    }>;
    getMonthlyTopProducts(month: any, year: any, limit?: number): Promise<any[]>;
    getTodayOrderStats(): Promise<{
        totalOrders: number;
        completed: number;
        cancelled: number;
        pending: number;
        totalAmount: any;
        totalMarkedPrice: any;
        revenue: number;
    }>;
}

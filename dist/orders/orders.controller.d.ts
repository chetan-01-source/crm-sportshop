import { OrdersService } from './service/orders.service';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { UpdateOrderDto } from '../orders/dto/update-order.dto';
import { Order } from './schemas/order.schema';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    private readonly logger;
    createOrder(createOrderDto: CreateOrderDto): Promise<Order>;
    getAllOrders(): Promise<Order[]>;
    getTodayOrderStats(): Promise<{
        totalOrders: number;
        completed: number;
        cancelled: number;
        pending: number;
        totalAmount: any;
        totalMarkedPrice: any;
        revenue: number;
    }>;
    getMonthlyTopProducts(month: number, year: number, limit?: number): Promise<any[]>;
    getMonthlyStats(): Promise<{
        totalAmount: number;
        totalMarkedPrice: number;
        revenue: number;
        totalOrders: number;
        completedOrders: number;
        pendingOrders: number;
        cancelledOrders: number;
    }>;
    getOrderById(id: string): Promise<Order>;
    updateOrder(id: string, updateOrderDto: UpdateOrderDto): Promise<Order>;
    deleteOrder(id: string): Promise<{
        message: string;
    }>;
    cancelOrder(orderId: string): Promise<Order>;
}

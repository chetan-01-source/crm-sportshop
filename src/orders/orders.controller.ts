import { Controller, Get, Post, Put, Delete, Param, Body, Query ,Logger} from '@nestjs/common';
import { OrdersService } from './service/orders.service';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { UpdateOrderDto } from '../orders/dto/update-order.dto';
import { Order } from './schemas/order.schema';

@Controller('orders')
export class OrdersController {
   
  constructor(private readonly ordersService: OrdersService) {}
  private readonly logger = new Logger('OrderService');
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get()
  async getAllOrders() {
    return this.ordersService.getAllOrders();
  }
  @Get('today-stats')
  async getTodayOrderStats() {
    console.log("CONTroller called here");
    return this.ordersService.getTodayOrderStats();
  }
  @Get('top-products')
  async getMonthlyTopProducts(
    @Query('month') month: number,
    @Query('year') year: number,
    @Query('limit') limit: number = 10,
  ) {
    return this.ordersService.getMonthlyTopProducts(month, year, limit);
  }
  // New: Calculate total amount and total marked price for current month
  @Get('stats/monthly')
  async getMonthlyStats() {
    return this.ordersService.calculateMonthlyStats();
  }
  
  
  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(id);
  }

  @Put(':id')
  async updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.updateOrder(id, updateOrderDto);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return this.ordersService.deleteOrder(id);
  }

  @Post(':id/cancel')
  async cancelOrder(@Param('id') orderId: string): Promise<Order> {
    return this.ordersService.cancelOrder(orderId);
  }

  

 
}

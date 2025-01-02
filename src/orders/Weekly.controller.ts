import { Controller, Get, Post, Put, Delete, Param, Body, Query ,Logger} from '@nestjs/common';
import { OrdersService } from './service/orders.service';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { UpdateOrderDto } from '../orders/dto/update-order.dto';
import { Order } from './schemas/order.schema';
import { WeeklyService } from './service/weekly.service';

@Controller('weekly')
export class WeeklyController{
    constructor(private readonly weeklyService: WeeklyService) {}
    @Get()
    async getWeeklyStats(){
     return  this.weeklyService.getWeeklyOrderStats();
 }
}

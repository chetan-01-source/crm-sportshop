import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from './orders.controller';
import { OrdersService } from './service/orders.service';
import { Order, OrderSchema } from './schemas/order.schema';
import { Customer, CustomerSchema } from '../customer/schema/customer.schema';
import { Inventory, InventorySchema } from '../inventory/schema/inventory.schema';
import { WeeklyController } from './Weekly.controller';
import { WeeklyService } from './service/weekly.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema },
      { name: 'Customer', schema: CustomerSchema },
      { name: 'Inventory', schema: InventorySchema },
    ]),
  ],
  controllers: [WeeklyController],
  providers: [WeeklyService],
  exports: [WeeklyService], // Export OrdersService for use in other modules
})
export class WeeklyModule {}

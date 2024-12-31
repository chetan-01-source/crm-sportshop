import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';  // Import CustomerModule
import { InventoryModule } from './inventory/inventory.module';
import { OrdersModule } from './orders/orders.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MonthlyArchiveModule } from './orders/monthly-archive.module';
import { Reflector } from '@nestjs/core';
import { AppController } from './app.controller';
//app module
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    CustomerModule,
    InventoryModule,
    OrdersModule,
    ScheduleModule.forRoot(),
    MonthlyArchiveModule,
    
  ],
  controllers: [AppController],
  providers: [Reflector],
})
export class AppModule {}

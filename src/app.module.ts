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
import { AppService } from './app.service';
import { WeeklyModule } from './orders/Weekly.module';
import { QrCodeModule } from './inventory/qr-code.module';


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
    WeeklyModule,
    QrCodeModule,
    
  ],
  controllers: [AppController],
  providers: [AppService,Reflector],
})
export class AppModule {}

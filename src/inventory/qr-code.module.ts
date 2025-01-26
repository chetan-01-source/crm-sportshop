import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QrCodeController } from './qr-code.controller';
import { QrCodeService } from './qr-code.service';
import { InventorySchema,Inventory } from './schema/inventory.schema'; // Import your Inventory schema

@Module({
  imports: [
    MongooseModule.forFeature([ { name: 'Inventory', schema: InventorySchema }]), // Register schema
  ],
  controllers: [QrCodeController],
  providers: [QrCodeService],
})
export class QrCodeModule {}

import { Model } from 'mongoose';
import { Inventory } from './schema/inventory.schema';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { NotificationService } from './notification.service';
export declare class InventoryService {
    private readonly inventoryModel;
    private notificationService;
    constructor(inventoryModel: Model<Inventory>, notificationService: NotificationService);
    create(createInventoryDto: CreateInventoryDto): Promise<import("mongoose").Document<unknown, {}, Inventory> & Inventory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Inventory> & Inventory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, Inventory> & Inventory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updateInventoryDto: UpdateInventoryDto): Promise<import("mongoose").Document<unknown, {}, Inventory> & Inventory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, Inventory> & Inventory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getLowStockItems(threshold: number): Promise<Inventory[]>;
    checkLowStock(threshold: number): Promise<void>;
}

import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './schema/inventory.schema';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    create(createInventoryDto: CreateInventoryDto): Promise<import("mongoose").Document<unknown, {}, Inventory> & Inventory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getLowStockItems(threshold: number): Promise<Inventory[]>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Inventory> & Inventory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Inventory> & Inventory & Required<{
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
}

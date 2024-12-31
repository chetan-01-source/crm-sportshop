"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cron = require("node-cron");
const notification_service_1 = require("./notification.service");
let InventoryService = class InventoryService {
    constructor(inventoryModel, notificationService) {
        this.inventoryModel = inventoryModel;
        this.notificationService = notificationService;
        cron.schedule('0 */6 * * *', async () => {
            console.log('Running low stock check...');
            await this.checkLowStock(5);
        });
    }
    async create(createInventoryDto) {
        const newInventory = new this.inventoryModel(createInventoryDto);
        return newInventory.save();
    }
    async findAll() {
        return this.inventoryModel.find().exec();
    }
    async findById(id) {
        return this.inventoryModel.findById(id).exec();
    }
    async update(id, updateInventoryDto) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ObjectId format');
        }
        return this.inventoryModel.findByIdAndUpdate(id, updateInventoryDto, { new: true });
    }
    async delete(id) {
        return this.inventoryModel.findByIdAndDelete(id).exec();
    }
    async getLowStockItems(threshold) {
        if (threshold <= 0) {
            throw new common_1.BadRequestException('Threshold must be greater than 0');
        }
        return this.inventoryModel.find({
            quantity: { $lte: threshold },
        }).exec();
    }
    async checkLowStock(threshold) {
        const lowStockItems = await this.inventoryModel.find({ quantity: { $lte: threshold } }).exec();
        if (lowStockItems.length > 0) {
            const emailContent = `
        <h3>Low Stock Alert</h3>
        <p>The following items have low stock:</p>
        <ul>
          ${lowStockItems.map(item => `<li>${item.name} (Quantity: ${item.quantity})</li>`).join('')}
        </ul>
      `;
            await this.notificationService.sendEmail(process.env.OWNER_EMAIL, 'Low Stock Alert', emailContent);
        }
        else {
            console.log('No items with low stock.');
        }
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Inventory')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        notification_service_1.NotificationService])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map
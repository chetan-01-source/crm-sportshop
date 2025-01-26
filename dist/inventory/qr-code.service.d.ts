import { Model } from 'mongoose';
import { Inventory } from './schema/inventory.schema';
export declare class QrCodeService {
    private readonly inventoryModel;
    constructor(inventoryModel: Model<Inventory>);
    generateQrCodePdf(id: string): Promise<Buffer>;
    private createPdfWithQrCode;
}

import { Response } from 'express';
import { QrCodeService } from './qr-code.service';
export declare class QrCodeController {
    private readonly qrCodeService;
    constructor(qrCodeService: QrCodeService);
    generateQrCodePdf(id: string, res: Response): Promise<void>;
}

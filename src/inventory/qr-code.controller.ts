import { Controller, Get, Param, Res, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { QrCodeService } from './qr-code.service';

@Controller('qr-code')
export class QrCodeController {
  constructor(private readonly qrCodeService: QrCodeService) {}

  @Get(':id/pdf')
  async generateQrCodePdf(@Param('id') id: string, @Res() res: Response) {
    try {
      // Generate the PDF containing the QR code for the given inventory item
      const pdfBuffer = await this.qrCodeService.generateQrCodePdf(id);

      // Set the appropriate headers to download the PDF
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="qr-code-${id}.pdf"`,
      });

      // Send the PDF buffer in the response
      res.send(pdfBuffer);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

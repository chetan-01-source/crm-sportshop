import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as QRCode from 'qrcode';
import * as PDFDocument from 'pdfkit';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory } from './schema/inventory.schema';

@Injectable()
export class QrCodeService {
  constructor(
    @InjectModel('Inventory') private readonly inventoryModel: Model<Inventory>,
  ) {}

  // Generate a QR code PDF for the inventory item with the given ID
  async generateQrCodePdf(id: string): Promise<Buffer> {
    // Fetch the inventory item by its ID
    const inventory = await this.inventoryModel.findById(id);
    if (!inventory) {
      throw new HttpException('Inventory item not found', HttpStatus.NOT_FOUND);
    }

    // Generate QR code as a base64 string
    const qrCodeDataUrl = await QRCode.toDataURL(id);

    // Generate the PDF with the QR code and inventory details
    const pdfBuffer = await this.createPdfWithQrCode(qrCodeDataUrl, inventory);
    return pdfBuffer;
  }

  // Helper function to create the PDF containing the QR code and inventory details
  private async createPdfWithQrCode(qrCodeDataUrl: string, inventory: Inventory): Promise<Buffer> {
    const doc = new PDFDocument();
    const chunks: Buffer[] = [];

    // Collect PDF data into a buffer
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => Promise.resolve());

    // Add text to the PDF (only name, price, and category)
    doc.fontSize(20).text('Product QR Code', { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`Name: ${inventory.name}`, { align: 'center' });
    doc.text(`Price: $${inventory.price}`, { align: 'center' });
    doc.text(`Category: ${inventory.category}`, { align: 'center' });
    doc.moveDown();

    // Embed the large QR code image into the PDF (Centered)
    const qrCodeSize = 250; // Make the QR code size large
    const pageWidth = doc.page.width; // PDF page width

    // Calculate the offset for centering
    const offset = (pageWidth - qrCodeSize) / 2;

    doc.image(qrCodeDataUrl, offset, doc.y, { width: qrCodeSize, height: qrCodeSize });

    // Finalize the PDF document
    doc.end();

    // Return the PDF buffer
    return new Promise((resolve) => {
      doc.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }
}

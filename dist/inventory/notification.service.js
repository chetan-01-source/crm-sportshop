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
var NotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let NotificationService = NotificationService_1 = class NotificationService {
    constructor() {
        this.logger = new common_1.Logger(NotificationService_1.name);
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: +process.env.SMTP_PORT,
            secure: process.env.SMTP_PORT === '465',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }
    async sendEmail(to, subject, htmlContent) {
        try {
            await this.transporter.sendMail({
                from: process.env.FROM_EMAIL,
                to,
                subject,
                html: htmlContent,
            });
            this.logger.log(`Email successfully sent to ${to}`);
        }
        catch (error) {
            this.logger.error(`Failed to send email to ${to}: ${error.message}`);
        }
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = NotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], NotificationService);
//# sourceMappingURL=notification.service.js.map
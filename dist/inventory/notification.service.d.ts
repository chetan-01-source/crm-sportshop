export declare class NotificationService {
    private readonly logger;
    private readonly transporter;
    constructor();
    sendEmail(to: string, subject: string, htmlContent: string): Promise<void>;
}

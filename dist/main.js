"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.useGlobalPipes(new common_1.ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }));
        app.enableCors({
            origin: true,
            methods: 'GET,POST,PUT,DELETE',
            credentials: true,
        });
        console.log('MongoDB URI:', process.env.MONGO_URI);
        await app.listen(process.env.PORT || 8080, '0.0.0.0');
        console.log(`Application is running on port ${process.env.PORT || 3000}`);
    }
    catch (error) {
        console.error('Error during application bootstrap:', error);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map
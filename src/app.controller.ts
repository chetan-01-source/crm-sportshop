import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  getHealthCheck(): string {
    return 'The CRM application is up and running!';
  }
}

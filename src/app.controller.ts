import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Connection } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly connection: Connection,
  ) {}

  // ✅ Root route — returns JSON
  @Get()
  getRoot() {
    return {
      status: 'ok',
      message: this.appService.getHello(),
    };
  }

  // ✅ Health route — pings Supabase
  @Get('health')
  async getHealth() {
    try {
      await this.connection.query('SELECT 1;');
      return {
        status: 'ok',
        db: 'connected',
      };
    } catch (error : any) {
      return {
        status: 'error',
        db: 'not connected',
        error: error.message,
      };
    }
  }
}

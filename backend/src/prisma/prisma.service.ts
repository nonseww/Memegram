import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);
  private isConnected = false;

  async onModuleInit() {
    if (this.isConnected) {
      return;
    }
    try {
      await this.$connect();
      this.isConnected = true;
      this.logger.log('DB was connected successfully');
    } catch (error) {
      this.isConnected = false;
      this.logger.error('DB was not connected!');
      throw error;
    }
  }

  async OnModuleDestroy() {
    await this.$disconnect();
    this.isConnected = false;
    this.logger.log('DB was disconnected!');
  }
}

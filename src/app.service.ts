import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { History } from './product/entities/history.entity';

export interface APIResponse {
  'API status': boolean;
  'Last CRON execution': Date;
  Uptime: number;
  'Memory usage': MemoryUsage;
}

export interface MemoryUsage {
  rss: number;
  heapTotal: number;
  heapUsed: number;
  external: number;
}
@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(History.name) private historyModel: Model<History>,
  ) {}

  async verifyStats(): Promise<APIResponse> {
    const databaseReadyState = this.connection.readyState ? true : false;
    const lastCron = await this.historyModel
      .findOne({}, {}, { sort: { imported_at: -1 } })
      .exec();

    return {
      'API status': databaseReadyState,
      'Last CRON execution': lastCron.imported_at,
      Uptime: process.uptime(),
      'Memory usage': {
        rss: process.memoryUsage().rss,
        heapTotal: process.memoryUsage().heapTotal,
        heapUsed: process.memoryUsage().heapUsed,
        external: process.memoryUsage().external,
      },
    };
  }
}

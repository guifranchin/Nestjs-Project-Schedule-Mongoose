import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as zlib from 'zlib';
import { chain } from 'stream-chain';
import { parser } from 'stream-json/jsonl/Parser';
import * as Batch from 'stream-json/utils/Batch';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { History } from './entities/history.entity';
import {
  ImportProcessingService,
  ResponseData,
} from './import-processing.service';

@Injectable()
export class ImportProductService {
  private readonly logger = new Logger(ImportProductService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly importProcessingService: ImportProcessingService,
    @InjectModel(History.name) private historyModel: Model<History>,
  ) {}

  async importProduct() {
    const { data } = await firstValueFrom(
      this.httpService.get(
        'https://challenges.coode.sh/food/data/json/index.txt',
      ),
    );
    const filesJson = data.split(/[\r\n]+/);
    const batchSize = 100;

    const historyPromises = filesJson
      .filter((f) => f.length > 1)
      .map(async (f) => {
        const { data } = await firstValueFrom(
          this.httpService.get(
            `https://challenges.coode.sh/food/data/json/${f}`,
            {
              responseType: 'stream',
            },
          ),
        );

        return new Promise((resolve, reject) => {
          const pipeline = chain([
            data,
            zlib.createGunzip(),
            parser(),
            new Batch({ batchSize }),
          ]);

          pipeline.on('data', (data: ResponseData[]) => {
            this.importProcessingService.processData(data, f);
            pipeline.destroy();
          });

          pipeline.on('close', () => resolve(true));

          pipeline.on('error', (err) => {
            reject(err);
          });
        });
      });

    return await Promise.all(historyPromises);
  }
}

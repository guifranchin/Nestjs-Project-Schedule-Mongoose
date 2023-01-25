import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ImportProductService } from './import-product.service';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { History, HistorySchema } from './entities/history.entity';
import { ImportProcessingService } from './import-processing.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: History.name, schema: HistorySchema },
    ]),
    HttpModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [ProductController],
  providers: [ProductService, ImportProductService, ImportProcessingService],
})
export class ProductModule {}

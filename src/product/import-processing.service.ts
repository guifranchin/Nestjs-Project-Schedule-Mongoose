import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { History } from './entities/history.entity';
import { Product } from './entities/product.entity';

export interface ResponseData {
  key: number;
  value: Product;
}

@Injectable()
export class ImportProcessingService {
  constructor(
    @InjectModel(History.name) private historyModel: Model<History>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  public async processData(data: ResponseData[], file: string): Promise<void> {
    let successRecords = 0;
    const totalRecords = data.length;
    let errorRecords = 0;
    const errorMessages = [];

    for (const product of data) {
      try {
        await this.productModel
          .findOneAndUpdate(
            { code: product.value.code },
            {
              status: 'published',
              imported_t: new Date(),
              url: product.value.url,
              creator: product.value.creator,
              created_t: product.value.created_t,
              last_modified_t: product.value.last_modified_t,
              product_name: product.value.product_name,
              quantity: product.value.quantity,
              brands: product.value.brands,
              categories: product.value.categories,
              labels: product.value.labels,
              cities: product.value.cities,
              purchase_places: product.value.purchase_places,
              stores: product.value.stores,
              ingredients_text: product.value.ingredients_text,
              traces: product.value.traces,
              serving_size: product.value.serving_size,
              serving_quantity: product.value.serving_quantity,
              nutriscore_score: product.value.nutriscore_score,
              main_category: product.value.main_category,
              image_url: product.value.image_url,
            },
            { upsert: true },
          )
          .exec();
        successRecords++;
      } catch (error: any) {
        errorRecords++;
        errorMessages.push(error);
      }
    }
    new this.historyModel({
      error_message: errorMessages,
      error_records: errorRecords,
      imported_at: new Date(),
      success_records: successRecords,
      total_records: totalRecords,
      file,
    }).save();
  }
}

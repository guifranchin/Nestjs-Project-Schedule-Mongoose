import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { ImportProductService } from './import-product.service';
import { NotFoundError } from '../exceptions/not-found.exceptions';

export interface ProductPagination {
  data: Product[];
  next_cursor: string;
}

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly importProductService: ImportProductService,
  ) {}

  async findAll(limit: number, nextCursor: string): Promise<ProductPagination> {
    const productList = await this.productModel
      .find(
        { _id: { $gt: nextCursor }, status: { $ne: 'trash' } },
        {},
        { limit: limit + 1, sort: { _id: -1 } },
      )
      .exec();

    const lastProduct = productList.pop();
    return {
      data: productList,
      next_cursor: lastProduct._id.toString(),
    };
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productModel.findOne({ code: id }).exec();
    if (!product) {
      throw new NotFoundError('product not found', id.toString());
    }

    return product;
  }

  async deleteById(id: number): Promise<void> {
    const product = await this.productModel
      .findOneAndUpdate({ code: id }, { status: 'trash' }, { upsert: true })
      .exec();

    if (!product) {
      throw new NotFoundError('product not found', id.toString());
    }
  }

  // @Cron('* * * * * *')
  async handleCron() {
    const data = await this.importProductService.importProduct();
    console.log(data);
    this.logger.debug('Cron executado');
  }
}

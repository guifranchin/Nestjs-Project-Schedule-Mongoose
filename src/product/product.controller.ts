import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common';
import { Delete, Query } from '@nestjs/common/decorators';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger/dist/decorators';
import { ProductPagination } from './entities/entities.resposes';
import { Product } from './entities/product.entity';
import { ProductNotFoundFilter } from './filters/product-not-found.filter';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  @ApiOkResponse({
    description:
      'ProductPagination is an object that contains information about a paginated product list',
    type: ProductPagination,
  })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({
    name: 'cursor',
    required: false,
    example: '63d05e25a0331c6c17331c1f',
  })
  async findAll(
    @Query('limit', ParseIntPipe) limit = 10,
    @Query('cursor') nextCursor = '',
  ) {
    return await this.productService.findAll(limit, nextCursor);
  }

  @Get('/:id')
  @ApiQuery({ name: 'id', required: true, example: 10 })
  @UseFilters(ProductNotFoundFilter)
  @ApiOkResponse({
    description:
      'Product is an object that contains information about a product',
    type: Product,
  })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return await this.productService.findById(id);
  }

  @Delete('/:id')
  @ApiQuery({ name: 'id', required: true, example: 10 })
  @ApiOkResponse({
    description:
      'Boolean tells you whether the object was changed successfully',
    type: Boolean,
  })
  @UseFilters(ProductNotFoundFilter)
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.deleteById(id);
  }

  @Get('/cron')
  async cron() {
    return await this.productService.handleCron();
  }
}

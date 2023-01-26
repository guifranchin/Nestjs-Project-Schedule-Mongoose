import { ApiProperty } from '@nestjs/swagger';
import { Product } from './product.entity';

export class MemoryUsage {
  @ApiProperty({ example: 78700544 })
  rss: number;

  @ApiProperty({ example: 40755200 })
  heapTotal: number;

  @ApiProperty({ example: 36653920 })
  heapUsed: number;

  @ApiProperty({ example: 19803099 })
  external: number;
}

export class APIResponseHealthCheck {
  @ApiProperty({ example: true })
  'API status': boolean;

  @ApiProperty({ example: '2022-01-01T00:00:00.000Z' })
  'Last CRON execution': Date;

  @ApiProperty({ example: 3600 })
  Uptime: number;

  @ApiProperty({ type: MemoryUsage })
  'Memory usage': MemoryUsage;
}

export class ProductPagination {
  @ApiProperty({ type: Product, isArray: true })
  data: Product[];

  @ApiProperty({ example: '63d05e25a0331c6c17331c1f' })
  next_cursor: string;
}

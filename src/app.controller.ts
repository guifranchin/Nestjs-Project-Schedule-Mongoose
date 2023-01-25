import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators';
import { APIResponseHealthCheck } from './product/entities/entities.resposes';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/')
  @ApiOkResponse({
    description:
      'APIResponseHealthCheck é um objeto que contém informações sobre o status da API',
    type: APIResponseHealthCheck,
  })
  async healthCheck(): Promise<APIResponseHealthCheck> {
    return await this.appService.verifyStats();
  }
}

import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

import { FastifyReply } from 'fastify';
import { NotFoundError } from 'src/exceptions/not-found.exceptions';

@Catch(NotFoundError)
export class ProductNotFoundFilter implements ExceptionFilter {
  catch(exception: NotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply<any>>();
    const request = ctx.getRequest<Request>();

    response.status(404).send({
      statusCode: 404,
      timestamp: new Date().toISOString(),
      path: request.url,
      resource: exception.message,
    });
  }
}

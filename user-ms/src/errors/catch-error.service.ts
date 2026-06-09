import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

@Injectable()
export class CatchErrorService {
  constructor(@Inject('LOGS') private readonly logsClient: ClientProxy) {}

  throwException(error: any, service: string, fxName: string) {
    this.logsClient
      .emit(
        { logs: 'create.error' },
        { error: JSON.stringify(error), service, fxName },
      )
      .subscribe();

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          throw new RpcException({
            statusCode: 409,
            message: 'Unique constraint violation',
            errors: error.meta,
          });

        case 'P2003':
          throw new RpcException({
            statusCode: 400,
            message: 'Foreign key constraint failed',
            errors: error.meta,
          });

        case 'P2025':
          throw new RpcException({
            statusCode: 404,
            message: 'Record not found',
            errors: error.meta,
          });

        default:
          throw new RpcException({
            statusCode: 500,
            message: 'Database error',
            errors: error.meta,
          });
      }
    }

    throw new RpcException({
      statusCode: 500,
      message: 'Internal server error',
      errors: JSON.stringify(error),
    });
  }
}

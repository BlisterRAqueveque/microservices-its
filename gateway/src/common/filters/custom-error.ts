import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class CustomErrors implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const error = exception.getError() as any;

    throw new HttpException(
      {
        message: error.message,
        errors: error.errors,
      },
      error.statusCode ?? 500,
    );
  }
}

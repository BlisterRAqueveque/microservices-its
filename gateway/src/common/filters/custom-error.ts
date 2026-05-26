import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class CustomErrors implements ExceptionFilter {
  catch(
    exception: { message: string; errorCode: number },
    host: ArgumentsHost,
  ) {
    throw new HttpException(exception.message, exception.errorCode);
  }
}

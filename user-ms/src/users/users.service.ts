import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      await this.prisma.user.create({
        data: createUserDto,
      });
    } catch (error) {
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
      });
    }
  }

  findAll() {
    return this.prisma.user.findMany({
      where: { deleted: false },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findFirst({ where: { id, deleted: false } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: { deleted: true, deletedAt: new Date() },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const data: User = await this.prisma.user.create({ data: createUserDto });
      return data;
    } catch (error) {
      console.log(error);
      throw Error(JSON.stringify(error));
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

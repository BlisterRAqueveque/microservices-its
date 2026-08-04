import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ user: 'findAll' })
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern({ user: 'findOne' })
  findOne(@Payload() id: number) {
    return this.usersService.findOne(id);
  }

  @MessagePattern({ user: 'update' })
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern({ user: 'remove' })
  remove(@Payload('id') id: number, @Payload('owner') owner: User) {
    return this.usersService.remove(id, owner);
  }
}

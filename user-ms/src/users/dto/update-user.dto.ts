import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Exclude, Type } from 'class-transformer';
import { IsBoolean, IsDate } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Exclude()
  @Type(() => Number)
  id: number = 0;
  @Exclude()
  @Type(() => Date)
  @IsDate()
  createdAt: Date = new Date();
  @Exclude()
  @Type(() => Boolean)
  @IsBoolean()
  active: boolean = true;
  @Exclude()
  @Type(() => Boolean)
  @IsBoolean()
  deleted: boolean = true;
}

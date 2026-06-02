import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string = '';
  @IsString()
  password: string = '';
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  lastName?: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsDate()
  @IsOptional()
  createdAt?: Date;
}

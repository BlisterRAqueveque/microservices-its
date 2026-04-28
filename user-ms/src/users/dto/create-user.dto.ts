import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type, Transform } from 'class-transformer';

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

  @Type(() => Number)
  @Transform(({ value }) => {
    const transformedValue = +value;
    return isNaN(transformedValue) ? undefined : transformedValue;
  })
  @IsNumber()
  age?: number;
}

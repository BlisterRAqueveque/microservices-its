import { IsOptional, IsString } from 'class-validator';

export class CredencialesDto {
  @IsString()
  username!: string;
  @IsString()
  password!: string;
  @IsString()
  @IsOptional()
  device: string | undefined;
}

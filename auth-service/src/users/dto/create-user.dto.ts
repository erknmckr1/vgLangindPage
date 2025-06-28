import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  storeName: string;

  @IsNotEmpty()
  phone: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}

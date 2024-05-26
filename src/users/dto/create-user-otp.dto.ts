import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserOtpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

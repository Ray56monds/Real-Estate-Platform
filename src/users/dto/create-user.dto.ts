import { Role } from '@prisma/client';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsEnum,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(20, { message: 'Password cannot be longer than 20 characters' })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsString()
  @MaxLength(50, { message: 'Name cannot be longer than 50 characters' })
  name?: string;

  @IsEnum(Role, { message: 'Role must be either TENANT or LANDLORD' })
  @IsNotEmpty({ message: 'Role is required' })
  role: Role;

  @IsString()
  @IsNotEmpty({ message: 'National ID is required' })
  nationalId: string;

  @IsString()
  @IsNotEmpty({ message: 'Date of Birth is required' })
  dateOfBirth: string;
}

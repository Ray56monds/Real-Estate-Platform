// src/properties/dto/create-property.dto.ts
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  Min,
  Max,
  Length,
} from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @Length(3, 100, {
    message: 'Title must be between 3 and 100 characters long',
  })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @Length(10, 1000, {
    message: 'Description must be between 10 and 1000 characters long',
  })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsNumber()
  @Min(0, { message: 'Price must be a positive number' })
  @Max(100000000, { message: 'Price must be less than 100,000,000' })
  @IsNotEmpty({ message: 'Price is required' })
  price: number;

  @IsString()
  @Length(5, 200, {
    message: 'Address must be between 5 and 200 characters long',
  })
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Owner ID is required' })
  ownerId: number;
}

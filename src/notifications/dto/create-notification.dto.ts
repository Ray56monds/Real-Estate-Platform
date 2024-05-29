import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @IsString()
  @IsOptional()
  readonly type?: string;

  @IsString()
  @IsOptional()
  readonly recipientId?: string;
}

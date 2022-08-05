import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordRequest {
  @ApiProperty({
    description: 'Email of the User',
    example: 'johndoe@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
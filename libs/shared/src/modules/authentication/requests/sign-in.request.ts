import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { PasswordRequest } from '../../shared/requests/password.request';

export class SignInRequest extends PasswordRequest {
  @ApiProperty({
    description: 'Email of the User',
    example: 'johndoe@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
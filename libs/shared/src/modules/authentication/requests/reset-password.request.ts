import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { PasswordObject } from '../objects/password.object';

export class ResetPasswordRequest extends PasswordObject {
  @ApiProperty({
    description: 'Token received with reset password email',
    example: 'joQM_QWXd8l6Io5EgO-qh',
  })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    description: 'Email of the User',
    example: 'johndoe@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { PasswordObject } from '../objects/password.object';

export class ResetPasswordRequest extends PasswordObject {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
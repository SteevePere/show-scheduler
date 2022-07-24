import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordRequest {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
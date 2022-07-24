import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class PasswordObject {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
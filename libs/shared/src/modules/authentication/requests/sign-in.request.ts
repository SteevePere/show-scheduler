import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

import { PasswordObject } from "../objects/password.object";

export class SignInRequest extends PasswordObject {
  @ApiProperty({
    description: 'Email of the User',
    example: 'johndoe@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
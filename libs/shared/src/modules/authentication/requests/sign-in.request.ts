import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignInRequest {
  @ApiProperty({
    description: 'Email of the User',
    example: 'johndoe@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @ApiProperty({
    description: 'Password of the User',
    example: 'NeverGonnaGiveYouUp1234',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
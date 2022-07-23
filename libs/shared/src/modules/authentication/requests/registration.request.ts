import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";

import { UserGenderEnum } from "../../users/enums/user-gender.enum";

export class RegistrationRequest {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsDateString()
  birthDate: Date;

  @IsEnum(UserGenderEnum)
  gender: UserGenderEnum;
}
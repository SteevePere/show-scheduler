import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

import { UserGenderEnum } from "../../users/enums/user-gender.enum";
import { PasswordObject } from "../objects/password.object";

export class RegistrationRequest extends PasswordObject {
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

  @IsDateString()
  birthDate: Date;

  @IsEnum(UserGenderEnum)
  gender: UserGenderEnum;
}
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";

import { BaseEntityObject } from "../../shared/objects/base-entity.object";
import { UserGenderEnum } from "../enums/user-gender.enum";
import { UserRoleEnum } from "../enums/user-role.enum";

export class UserObject extends BaseEntityObject {
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

  @IsOptional()
  password?: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  birthDate: Date;

  @IsEnum(UserGenderEnum)
  gender: UserGenderEnum;

  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;

  @IsOptional()
  @IsString()
  @ValidateIf((object, value) => value !== null)
  resetPasswordToken?: string | null;
}
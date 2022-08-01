import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { UserGenderEnum } from "../enums/user-gender.enum";

export class UpdateUserRequest {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  birthDate?: Date;

  @IsOptional()
  @IsEnum(UserGenderEnum)
  gender?: UserGenderEnum;
}
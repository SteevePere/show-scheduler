import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { UserGenderEnum } from "../enums/user-gender.enum";

export class UpdateUserRequest {
  @ApiPropertyOptional({
    description: 'New first name of the User',
    example: 'John',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @ApiPropertyOptional({
    description: 'New last name of the User',
    example: 'Doe',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @ApiPropertyOptional({
    description: 'New eail of the User',
    example: 'johndoe@gmail.com',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'New birth date of the User',
    example: '1991-10-16T21:50:00.000Z',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  birthDate?: Date;


  @ApiPropertyOptional({
    enum: UserGenderEnum,
    description: 'New gender of the User',
    example: UserGenderEnum.MALE,
  })
  @IsOptional()
  @IsEnum(UserGenderEnum)
  gender?: UserGenderEnum;
}
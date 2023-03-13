import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

import { Match } from "../../../decorators/validation/match.decorator";
import { UserGenderEnum } from "../../users/enums/user-gender.enum";
import { PasswordObject } from "../objects/password.object";

export class RegistrationRequest extends PasswordObject {
  @ApiProperty({
    description: 'First name of the future User',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the future User',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Email of the future User',
    example: 'johndoe@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password confirmation of the future User. Must match password',
    example: 'NeverGonnaGiveYouUp1234',
  })
  @IsString()
  @IsNotEmpty()
  @Match('password')
  passwordConfirm: string;

  @ApiProperty({
    description: 'Birth date of the future User',
    example: '1991-10-16T21:50:00.000Z',
  })
  @IsDateString()
  birthDate: Date;

  @ApiProperty({
    enum: UserGenderEnum,
    description: 'Gender of the future User',
    example: UserGenderEnum.MALE,
  })
  @IsEnum(UserGenderEnum)
  gender: UserGenderEnum;
}
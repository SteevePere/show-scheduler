import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf
} from 'class-validator';

import { Match } from '../../../decorators/validation/match.decorator';
import { MIN_PASSWORD_LENGTH } from '../../shared/constants/constants';
import { UserGenderEnum } from '../enums/user-gender.enum';

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

  @ApiPropertyOptional({
    description: 'New password of the User',
    example: 'NeverGonnaGiveYouUp1234',
    minLength: MIN_PASSWORD_LENGTH,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_PASSWORD_LENGTH)
  password?: string;

  @ApiPropertyOptional({
    description: 'Confirmation of the new password. Must match password',
    example: 'NeverGonnaGiveYouUp1234',
  })
  @ValidateIf((request) => !!request.password)
  @IsString()
  @IsNotEmpty()
  @Match('password')
  passwordConfirm?: string;

  @ApiPropertyOptional({
    description: 'Old password of the User',
    example: 'NeverGonnaGiveYouUp1234',
  })
  @ValidateIf((request) => !!request.password)
  @IsString()
  @IsNotEmpty()
  oldPassword?: string;
}
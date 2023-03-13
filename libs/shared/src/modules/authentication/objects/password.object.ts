import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

import { MIN_PASSWORD_LENGTH } from '../../shared/constants/constants';

export class PasswordObject {
  @ApiProperty({
    description: 'Password of the future User',
    example: 'NeverGonnaGiveYouUp1234',
    minLength: MIN_PASSWORD_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_PASSWORD_LENGTH)
  password: string;
}
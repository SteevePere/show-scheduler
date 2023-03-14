import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { Match } from '../../../decorators/validation/match.decorator';
import { PasswordObject } from '../objects/password.object';

export class ResetPasswordRequest extends PasswordObject {
  @ApiProperty({
    description: 'Token received with reset password email',
    example: 'joQM_QWXd8l6Io5EgO-qh',
  })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    description: 'Email of the User',
    example: 'johndoe@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Confirmation of the new password. Must match password',
    example: 'NeverGonnaGiveYouUp1234',
  })
  @IsString()
  @IsNotEmpty()
  @Match('password')
  passwordConfirm: string;
}
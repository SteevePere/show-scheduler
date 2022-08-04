import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class PasswordObject {
  @ApiProperty({
    description: 'Password of the future User',
    example: 'NeverGonnaGiveYouUp1234',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
import { ApiProperty } from '@nestjs/swagger';
import { IsObject, ValidateNested } from 'class-validator';

import { TokensObject } from '../objects/tokens.object';
import { UserResponse } from './user.response';

export class AuthenticationResponse extends UserResponse {
  @ApiProperty({
    description: 'JWT tokens of the authenticated User',
  })
  @IsObject()
  @ValidateNested()
  tokens: TokensObject;
}
import { ApiProperty } from '@nestjs/swagger';
import { IsObject, ValidateNested } from 'class-validator';

import { UserObject } from '../../users/objects/user.object';

export class UserResponse {
  @ApiProperty({
    description: 'Authenticated User',
  })
  @IsObject()
  @ValidateNested()
  user: UserObject;
}
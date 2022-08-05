import { ApiProperty } from "@nestjs/swagger";

import { UserObject } from "../objects/user.object";

export class UpdateUserResponse {
  @ApiProperty({
    description: 'User object targeted by the request',
  })
  user: UserObject
}
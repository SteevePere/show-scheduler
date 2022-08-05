import { ApiProperty } from "@nestjs/swagger";
import { IsObject, ValidateNested } from "class-validator";

import { UserObject } from "../../users/objects/user.object";
import { TokensObject } from "../objects/tokens.object";

export class AuthenticationResponse {
  @ApiProperty({
    description: 'Authenticated User',
  })
  @IsObject()
  @ValidateNested()
  user: UserObject;

  @ApiProperty({
    description: 'JWT tokens of the authenticated User',
  })
  @IsObject()
  @ValidateNested()
  tokens: TokensObject;
}
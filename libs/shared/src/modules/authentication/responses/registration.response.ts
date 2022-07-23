import { IsObject, ValidateNested } from "class-validator";

import { UserObject } from "../../users/objects/user.object";
import { TokensObject } from "../objects/tokens.object";

export class RegistrationResponse {
  @IsObject()
  @ValidateNested()
  user: UserObject;

  @IsObject()
  @ValidateNested()
  tokens: TokensObject;
}
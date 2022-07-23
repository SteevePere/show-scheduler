import { IsNotEmpty, IsString } from "class-validator";

export class TokensObject {
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
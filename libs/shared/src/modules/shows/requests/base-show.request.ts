import { IsNotEmpty, IsNumberString, IsUUID, ValidateIf } from "class-validator";

export class BaseShowRequest {
  @ValidateIf((request) => !request.externalId)
  @IsUUID()
  @IsNotEmpty()
  id?: string;

  @ValidateIf((request) => !request.id)
  @IsNumberString()
  externalId?: number;
}
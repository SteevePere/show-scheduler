import { IsNotEmpty, IsNumberString, IsUUID, ValidateIf } from "class-validator";

export class FindShowRequest {
  @ValidateIf((request) => !request.externalId)
  @IsUUID()
  @IsNotEmpty()
  id?: string;

  @ValidateIf((request) => !request.id)
  @IsNumberString()
  externalId?: number;
}
import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUrl, ValidateIf } from "class-validator";

import { IsSafeInt } from "../../../decorators/validation/is-safe-integer.decorator";
import { BaseEntityObject } from "../../shared/objects/base-entity.object";

export class SeasonObject extends BaseEntityObject {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  showId?: string;

  @IsSafeInt()
  externalId: number;

  @ValidateIf((object, value) => value !== null)
  @IsNotEmpty()
  @IsString()
  name: string | null;

  @IsSafeInt()
  number: number;

  @ValidateIf((object, value) => value !== null)
  @IsString()
  summary: string |  null;

  @IsUrl()
  imageUrl: string;

  @ValidateIf((object, value) => value !== null)
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  premiereDate?: Date | null;

  @ValidateIf((object, value) => value !== null)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  endDate?: Date | null;
}

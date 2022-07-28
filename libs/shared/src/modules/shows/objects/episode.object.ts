import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUrl, ValidateIf } from "class-validator";

import { IsSafeInt } from "../../../decorators/validation/is-safe-integer.decorator";
import { BaseEntityObject } from "../../shared/objects/base-entity.object";

export class EpisodeObject extends BaseEntityObject {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  seasonId?: string;

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

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  airDate?: Date;

  @IsUrl()
  imageUrl: string;
}

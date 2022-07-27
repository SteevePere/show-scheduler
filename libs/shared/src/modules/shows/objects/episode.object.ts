import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, ValidateIf } from "class-validator";

import { BaseEntityObject } from "../../shared/objects/base-entity.object";

export class EpisodeObject extends BaseEntityObject {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  seasonId?: string;

  @IsInt()
  externalId: number;

  @ValidateIf((object, value) => value !== null)
  @IsNotEmpty()
  @IsString()
  name: string | null;

  @IsInt()
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

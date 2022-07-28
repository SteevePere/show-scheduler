import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, ValidateIf } from "class-validator";

import { IsSafeInt } from "../../../decorators/validation/is-safe-integer.decorator";
import { BaseEntityObject } from "../../shared/objects/base-entity.object";

export class ShowObject extends BaseEntityObject {
  @IsSafeInt()
  externalId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateIf((object, value) => value !== null)
  @IsString()
  summary: string | null;

  @IsNotEmpty()
  @IsString()
  language: string;

  @ValidateIf((object, value) => value !== null)
  @IsNumber()
  rating: number | null;

  @IsUrl()
  imageUrl: string;

  @IsArray()
  genres: string[];

  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  lastFavoritedAt?: Date | null;
}
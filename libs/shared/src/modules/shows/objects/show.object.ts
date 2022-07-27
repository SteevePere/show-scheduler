import { IsArray, IsInt, IsNotEmpty, IsNumber, IsString, IsUrl, ValidateIf } from "class-validator";

import { BaseEntityObject } from "../../shared/objects/base-entity.object";

export class ShowObject extends BaseEntityObject {
  @IsInt()
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
}
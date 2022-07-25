import { IsArray, IsInt, IsNotEmpty, IsNumber, IsString, IsUrl, ValidateIf } from "class-validator";

export class ShowObject {
  @IsInt()
  externalId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateIf((object, value) => value !== null)
  @IsString()
  summary: string;

  @IsNotEmpty()
  @IsString()
  language: string;

  @ValidateIf((object, value) => value !== null)
  @IsNumber()
  rating: number;

  @IsUrl()
  imageUrl: string;

  @IsArray()
  genres: string[];
}
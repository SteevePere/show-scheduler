import { IsString, IsNotEmpty, IsDateString, IsOptional } from "class-validator";

export class BaseEntityObject {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  createdAt?: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  updatedAt?: Date;
}
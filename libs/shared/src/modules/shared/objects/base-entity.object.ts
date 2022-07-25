import { IsString, IsNotEmpty, IsDateString } from "class-validator";

export class BaseEntityObject {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  updatedAt: Date;
}
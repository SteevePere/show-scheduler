import { Type } from "class-transformer";
import { IsNumber, Min, IsOptional } from "class-validator";

export class PaginatedRequest {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  skip = 0;
  
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit = 20;
}
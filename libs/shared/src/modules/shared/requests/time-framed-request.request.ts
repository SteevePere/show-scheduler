import { Type } from "class-transformer";
import { IsDateString, IsOptional } from "class-validator";

export class TimeFramedRequest {
  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  startDate?: Date;
  
  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  endDate?: Date;
}
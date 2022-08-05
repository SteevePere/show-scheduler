import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsOptional } from "class-validator";

export class TimeFramedRequest {
  @ApiPropertyOptional({
    description: 'Start of the period used to filter results',
    example: '1991-10-16T21:50:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  startDate?: Date;
  
  @ApiPropertyOptional({
    description: 'End of the period used to filter results',
    example: '1994-09-28T21:53:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  endDate?: Date;
}
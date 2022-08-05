import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchShowsRequest {
  @ApiPropertyOptional({
    description: 'Query string to filter Show names',
    example: 'breaking',
  })
  @IsOptional()
  @IsString()
  query?: string;
}
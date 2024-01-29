import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsUUID
} from 'class-validator';

import {
  TimeFramedRequest
} from '../../shared/requests/time-framed-request.request';

export class FindEpisodesRequest extends TimeFramedRequest {
  @ApiProperty({
    description: 'Number of pages to skip',
    example: 1,
  })
  @IsOptional()
  @IsNumberString()
  skip: number;
  
  @ApiProperty({
    description: 'Number of items per page',
    example: 1,
  })
  @IsOptional()
  @IsNumberString()
  limit: number;
  
  @ApiPropertyOptional({
    description: 'Internal id of the parent Show',
    example: 'ab321168-945d-42fc-afdb-0efec1e3dedf',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  showId?: string;
}
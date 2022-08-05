import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';

import { ShowObject } from '../objects/show.object';

export class SearchShowsResponse {
  @ApiProperty({
    description: 'Shows found according to search criteria',
  })
  @IsArray()
  @ValidateNested()
  shows: ShowObject[];
}
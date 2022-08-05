import { ApiProperty } from '@nestjs/swagger';
import { IsObject, ValidateNested } from 'class-validator';

import { SeasonObject } from '../objects/season.object';

export class BaseSeasonResponse {
  @ApiProperty({
    description: 'Season object targeted by the request',
  })
  @IsObject()
  @ValidateNested()
  season: SeasonObject;
}
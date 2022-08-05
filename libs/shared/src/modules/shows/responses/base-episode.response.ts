import { ApiProperty } from '@nestjs/swagger';
import { IsObject, ValidateNested } from 'class-validator';

import { EpisodeObject } from '../objects/episode.object';

export class BaseEpisodeResponse {
  @ApiProperty({
    description: 'Episode object targeted by the request',
  })
  @IsObject()
  @ValidateNested()
  episode: EpisodeObject;
}
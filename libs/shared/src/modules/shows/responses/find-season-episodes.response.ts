import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';

import { EpisodeObject } from '../objects/episode.object';

export class FindSeasonEpisodesResponse {
  @ApiProperty({
    description: 'Episodes found according to search criteria',
    type: [EpisodeObject],
  })
  @IsArray()
  @ValidateNested()
  episodes: EpisodeObject[];
}
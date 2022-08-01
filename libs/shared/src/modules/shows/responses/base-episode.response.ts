import { IsObject, ValidateNested } from 'class-validator';

import { EpisodeObject } from '../objects/episode.object';

export class BaseEpisodeResponse {
  @IsObject()
  @ValidateNested()
  episode: EpisodeObject;
}
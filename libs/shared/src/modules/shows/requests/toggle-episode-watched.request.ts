import { IsBoolean } from 'class-validator';

import { BaseShowRequest } from './base-show.request';

export class ToggleEpisodeWatchedRequest extends BaseShowRequest {
  @IsBoolean()
  isWatched: boolean;
}
import { IsBoolean } from 'class-validator';

import { BaseShowRequest } from './base-show.request';

export class ToggleSeasonWatchedRequest extends BaseShowRequest {
  @IsBoolean()
  isWatched: boolean;
}
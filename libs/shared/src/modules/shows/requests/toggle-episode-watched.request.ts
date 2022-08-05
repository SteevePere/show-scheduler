import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

import { BaseShowRequest } from './base-show.request';

export class ToggleEpisodeWatchedRequest extends BaseShowRequest {
  @ApiProperty({
    description: 'Whether the User wishes to mark the Episode as watched or not',
    example: true,
  })
  @IsBoolean()
  isWatched: boolean;
}
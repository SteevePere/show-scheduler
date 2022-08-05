import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

import { BaseFavoriteRequest } from './base-favorite.request';

export class CreateFavoriteRequest extends BaseFavoriteRequest {
  @ApiProperty({
    description: 'Whether the User wishes to receive notifications for upcoming Episodes',
    example: true,
  })
  @IsBoolean()
  isNotificationEnabled: boolean;
}
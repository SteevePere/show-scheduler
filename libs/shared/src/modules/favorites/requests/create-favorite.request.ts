import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

import { BaseFavoriteRequest } from './base-favorite.request';

export class CreateFavoriteRequest extends BaseFavoriteRequest {
  @ApiPropertyOptional({
    description: 'Whether the User wishes to receive notifications for upcoming Episodes',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isNotificationEnabled?: boolean;
}
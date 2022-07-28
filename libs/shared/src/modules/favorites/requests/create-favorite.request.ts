import { IsBoolean } from 'class-validator';

import { BaseFavoriteRequest } from './base-favorite.request';

export class CreateFavoriteRequest extends BaseFavoriteRequest {
  @IsBoolean()
  isNotificationEnabled: boolean;
}
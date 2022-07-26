import { IsBoolean, IsInt } from 'class-validator';

export class CreateFavoriteRequest {
  @IsInt()
  showExternalId: number;

  @IsBoolean()
  isNotificationEnabled: boolean;
}
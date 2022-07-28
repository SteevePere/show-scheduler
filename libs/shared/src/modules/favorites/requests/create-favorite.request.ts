import { IsBoolean } from 'class-validator';

import { IsSafeInt } from '../../../decorators/validation/is-safe-integer.decorator';

export class CreateFavoriteRequest {
  @IsSafeInt()
  showExternalId: number;

  @IsBoolean()
  isNotificationEnabled: boolean;
}
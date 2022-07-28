import { IsSafeInt } from '../../../decorators/validation/is-safe-integer.decorator';

export class BaseFavoriteRequest {
  @IsSafeInt()
  showExternalId: number;
}
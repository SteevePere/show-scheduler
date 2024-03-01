import { UserObject } from '@scheduler/shared';
import { SeasonEntity } from '../entities/season.entity';

export class IsSeasonWatchedData {
  seasonEntity: SeasonEntity;
  currentUser: UserObject;
}

export class IsSeasonWatchedResult {
  isWatchedByUser: boolean;
}

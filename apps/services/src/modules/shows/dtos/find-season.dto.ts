import { SeasonObject } from '@scheduler/shared';

export class FindSeasonData {
  id?: string;
  externalId?: number;
  ignoreNotFound?: boolean;
}

export class FindSeasonResult {
  season: SeasonObject;
}

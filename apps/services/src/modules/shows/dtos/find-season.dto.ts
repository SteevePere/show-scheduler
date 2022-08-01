import { SeasonObject } from '@scheduler/shared';

export class FindSeasonData {
  id?: string;
  externalId?: number;
  ignoreNotFound?: boolean;
  relations?: string[];
}

export class FindSeasonResult {
  season: SeasonObject;
}

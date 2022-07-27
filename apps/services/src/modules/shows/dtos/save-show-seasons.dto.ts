import { SeasonObject } from '@scheduler/shared';

export class SaveShowSeasonsData {
  showId: string;
  showExternalId: number;
}

export class SaveShowSeasonsResult {
  seasons: SeasonObject[];
}

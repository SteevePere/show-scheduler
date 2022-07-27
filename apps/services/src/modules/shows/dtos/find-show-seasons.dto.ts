import { SeasonObject } from '@scheduler/shared';

export class FindShowSeasonsData {
  showExternalId: number;
}

export class FindShowSeasonsResult {
  seasons: SeasonObject[];
}

import { FindSeasonResponse, UserObject } from '@scheduler/shared';

export class FindSeasonData {
  id?: string;
  externalId?: number;
  ignoreNotFound?: boolean;
  relations?: string[];
  currentUser?: UserObject;
}

export class FindSeasonResult extends FindSeasonResponse {}

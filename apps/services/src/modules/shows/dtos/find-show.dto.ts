import { ShowObject } from '@scheduler/shared';

export class FindShowData {
  id?: string;
  externalId?: number;
  ignoreNotFound?: boolean;
  onlyInternal?: boolean;
}

export class FindShowResult {
  show: ShowObject;
}

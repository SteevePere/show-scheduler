import {
  FindShowRequest,
  FindShowResponse,
  ShowObject,
  UserObject,
} from '@scheduler/shared';

export class FindShowData extends FindShowRequest {
  ignoreNotFound?: boolean;
  onlyInternal?: boolean;
  relations?: string[];
  order?: any | undefined;
  currentUser?: UserObject;
}

export class FindShowResult extends FindShowResponse {
  show: ShowObject | null;
}

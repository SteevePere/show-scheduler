import {
  FindShowRequest,
  FindShowResponse,
  ShowObject,
} from '@scheduler/shared';

export class FindShowData extends FindShowRequest {
  ignoreNotFound?: boolean;
  onlyInternal?: boolean;
}

export class FindShowResult extends FindShowResponse {
  show: ShowObject | null;
}

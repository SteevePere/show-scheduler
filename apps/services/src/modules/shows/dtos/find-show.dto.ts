import {
  FindShowRequest,
  FindShowResponse,
  ShowObject,
  UserObject,
} from '@scheduler/shared';
import { FindOptionsOrder } from 'typeorm';
import { ShowEntity } from '../entities/show.entity';

export class FindShowData extends FindShowRequest {
  ignoreNotFound?: boolean;
  onlyInternal?: boolean;
  relations?: string[];
  order?: FindOptionsOrder<ShowEntity>;
  currentUser?: UserObject;
}

export class FindShowResult extends FindShowResponse {
  show: ShowObject | null;
}

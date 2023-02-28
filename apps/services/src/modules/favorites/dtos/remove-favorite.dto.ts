import {
  RemoveFavoriteRequest,
  RemoveFavoriteResponse,
  UserObject,
} from '@scheduler/shared';

export class RemoveFavoriteData extends RemoveFavoriteRequest {
  currentUser: UserObject;
}

export class RemoveFavoriteResult extends RemoveFavoriteResponse {}

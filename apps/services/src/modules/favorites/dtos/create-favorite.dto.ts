import {
  CreateFavoriteRequest,
  CreateFavoriteResponse,
  UserObject,
} from '@scheduler/shared';

export class CreateFavoriteData extends CreateFavoriteRequest {
  currentUser: UserObject;
}

export class CreateFavoriteResult extends CreateFavoriteResponse {}

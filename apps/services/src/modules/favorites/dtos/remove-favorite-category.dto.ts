import {
  RemoveFavoriteCategoryRequest,
  RemoveFavoriteCategoryResponse,
  UserObject,
} from '@scheduler/shared';

export class RemoveFavoriteCategoryData extends RemoveFavoriteCategoryRequest {
  currentUser: UserObject;
}

export class RemoveFavoriteCategoryResult extends RemoveFavoriteCategoryResponse {}

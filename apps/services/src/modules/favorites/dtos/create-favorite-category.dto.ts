import {
  CreateFavoriteCategoryRequest,
  CreateFavoriteCategoryResponse,
  UserObject,
} from '@scheduler/shared';

export class CreateFavoriteCategoryData extends CreateFavoriteCategoryRequest {
  currentUser: UserObject;
}

export class CreateFavoriteCategoryResult extends CreateFavoriteCategoryResponse {}

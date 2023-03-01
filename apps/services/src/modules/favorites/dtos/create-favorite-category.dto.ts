import {
  CreateFavoriteCategoryRequest,
  CreateFavoriteCategoryResponse,
} from '@scheduler/shared';

export class CreateFavoriteCategoryData extends CreateFavoriteCategoryRequest {
  userId: string;
}

export class CreateFavoriteCategoryResult extends CreateFavoriteCategoryResponse {}

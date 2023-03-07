import {
  UpdateFavoriteCategoryRequest,
  UpdateFavoriteCategoryResponse,
} from '@scheduler/shared';

export class UpdateFavoriteCategoryData extends UpdateFavoriteCategoryRequest {
  id: string;
}

export class UpdateFavoriteCategoryResult extends UpdateFavoriteCategoryResponse {}

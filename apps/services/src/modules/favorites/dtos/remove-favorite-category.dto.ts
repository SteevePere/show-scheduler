import {
  FavoriteCategoryObject,
  RemoveFavoriteCategoryResponse,
} from '@scheduler/shared';

export class RemoveFavoriteCategoryData {
  category: FavoriteCategoryObject;
}

export class RemoveFavoriteCategoryResult extends RemoveFavoriteCategoryResponse {}

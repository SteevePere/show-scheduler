import { FavoriteObject } from '@scheduler/shared';
import { UserFavoriteCategoryEntity } from '../entities/user-favorite-category.entity';

export class AssignFavoritesToCategoryData {
  favoriteIds: string[];
  category: UserFavoriteCategoryEntity;
}

export class AssignFavoritesToCategoryResult {
  updatedFavorites: FavoriteObject[];
}

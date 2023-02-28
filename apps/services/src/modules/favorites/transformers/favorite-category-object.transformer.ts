import { FavoriteCategoryObject, FavoriteObject } from '@scheduler/shared';
import { createFromClass } from 'src/core/utils/transformers.util';
import { UserFavoriteCategoryEntity } from '../entities/user-favorite-category.entity';

interface IFavoriteCategoryTransformerData {
  favoriteCategoryEntity: UserFavoriteCategoryEntity;
  favorites?: FavoriteObject[];
}

export function createFavoriteCategoryObjectFromEntity(
  data: IFavoriteCategoryTransformerData,
) {
  const {
    favoriteCategoryEntity: {
      id,
      userId,
      parentId,
      name,
      createdAt,
      updatedAt,
    },
    favorites,
  } = data;

  return createFromClass(FavoriteCategoryObject, {
    id,
    userId,
    parentId,
    name,
    favorites,
    createdAt,
    updatedAt,
  });
}

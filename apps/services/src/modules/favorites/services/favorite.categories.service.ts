import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteCategoryObject } from '@scheduler/shared';
import { Repository } from 'typeorm';
import {
  AssignFavoritesToCategoryData,
  AssignFavoritesToCategoryResult,
} from '../dtos/assign-favorites-to-category.dto';
import {
  CreateFavoriteCategoryData,
  CreateFavoriteCategoryResult,
} from '../dtos/create-favorite-category.dto';
import {
  FindFavoriteCategoryTreeData,
  FindFavoriteCategoryTreeResult,
} from '../dtos/find-favorite-category-tree.dto';
import {
  FindFavoriteCategoryData,
  FindFavoriteCategoryResult,
} from '../dtos/find-favorite-category.dto';
import {
  RemoveFavoriteCategoryData,
  RemoveFavoriteCategoryResult,
} from '../dtos/remove-favorite-category.dto';
import {
  UpdateFavoriteCategoryData,
  UpdateFavoriteCategoryResult,
} from '../dtos/update-favorite-category.dto';
import { UserFavoriteCategoryEntity } from '../entities/user-favorite-category.entity';
import { createFavoriteCategoryObjectFromEntity } from '../transformers/favorite-category-object.transformer';
import { FavoritesService } from './favorites.service';

@Injectable()
export class FavoriteCategoriesService {
  constructor(
    @InjectRepository(UserFavoriteCategoryEntity)
    private readonly favoriteCategoriesRepository: Repository<UserFavoriteCategoryEntity>,
    private favoritesService: FavoritesService,
  ) {}

  async createFavoriteCategory(
    data: CreateFavoriteCategoryData,
  ): Promise<CreateFavoriteCategoryResult> {
    const { parentId, userId, name, favorites: favoriteIds } = data;

    try {
      const categoryToSave = this.favoriteCategoriesRepository.create({
        userId,
        parentId: parentId || null,
        name,
      });
      const newCategory = await this.favoriteCategoriesRepository.save(
        categoryToSave,
      );
      const assignToCategoryResult = favoriteIds
        ? await this.assignFavoritesToCategory({
            favoriteIds,
            category: newCategory,
          })
        : undefined;

      return {
        category: createFavoriteCategoryObjectFromEntity({
          favoriteCategoryEntity: newCategory,
          favorites: assignToCategoryResult?.updatedFavorites,
        }),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error trying to save Category',
        error,
      );
    }
  }

  async updateFavoriteCategory(
    data: UpdateFavoriteCategoryData,
  ): Promise<UpdateFavoriteCategoryResult> {
    const { id } = data;

    const category = await this.findFavoriteCategoryEntity({ id });
    try {
      Object.assign(category, { ...data });
      const savedCategory = await this.favoriteCategoriesRepository.save(
        category,
      );

      return {
        category: createFavoriteCategoryObjectFromEntity({
          favoriteCategoryEntity: savedCategory,
        }),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Unable to update Category',
        error,
      );
    }
  }

  async removeFavoriteCategory(
    data: RemoveFavoriteCategoryData,
  ): Promise<RemoveFavoriteCategoryResult> {
    const { category } = data;
    try {
      await this.favoriteCategoriesRepository.delete(category.id);

      return {
        category,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error when trying to remove Category',
        error,
      );
    }
  }

  async findFavoriteCategory(
    data: FindFavoriteCategoryData,
  ): Promise<FindFavoriteCategoryResult> {
    const category = await this.findFavoriteCategoryEntity(data);

    return {
      category: createFavoriteCategoryObjectFromEntity({
        favoriteCategoryEntity: category,
      }),
    };
  }

  async findFavoriteCategoryTree(
    data: FindFavoriteCategoryTreeData,
  ): Promise<FindFavoriteCategoryTreeResult> {
    const { userId } = data;
    const userCategories = await this.favoriteCategoriesRepository.find({
      where: {
        userId,
      },
      relations: ['favorites', 'favorites.show'],
    });
    const catObjects = userCategories.map((cat) =>
      createFavoriteCategoryObjectFromEntity({
        favoriteCategoryEntity: cat,
      }),
    );
    const sortedCategoryTree: FavoriteCategoryObject[] = [];

    const categoryTreeSorter = (category: FavoriteCategoryObject) => {
      const categoryChildren = catObjects.filter(
        (cat) => cat.parentId === category.id,
      );
      category.children = category.children
        ? category.children.concat(categoryChildren, [...category.children])
        : [...categoryChildren];
      if (category.parentId === null) {
        sortedCategoryTree.push(category);
      }
      categoryChildren.forEach((cat) => {
        categoryTreeSorter(cat);
      });
    };

    const rootCategories = catObjects.filter((cat) => cat.parentId === null);
    rootCategories.forEach((cat) => categoryTreeSorter(cat));

    return { categories: sortedCategoryTree };
  }

  private async findFavoriteCategoryEntity(
    data: FindFavoriteCategoryData,
  ): Promise<UserFavoriteCategoryEntity> {
    const { id } = data;
    const foundFavoriteCategory =
      await this.favoriteCategoriesRepository.findOne({
        where: {
          id,
        },
      });

    if (!foundFavoriteCategory) {
      throw new NotFoundException('Category of Favorites not found');
    }

    return foundFavoriteCategory;
  }

  private async assignFavoritesToCategory(
    data: AssignFavoritesToCategoryData,
  ): Promise<AssignFavoritesToCategoryResult> {
    const { favoriteIds, category } = data;
    const updatedFavorites = await Promise.all(
      favoriteIds.map(async (favoriteId: string) => {
        const { favorite } = await this.favoritesService.updateFavorite({
          id: favoriteId,
          data: {
            categoryId: category.id,
          },
        });
        return favorite;
      }),
    );

    return { updatedFavorites };
  }
}

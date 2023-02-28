import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  AssignFavoritesToCategoryData,
  AssignFavoritesToCategoryResult,
} from '../dtos/assign-favorites-to-category.dto';
import {
  CreateFavoriteCategoryData,
  CreateFavoriteCategoryResult,
} from '../dtos/create-favorite-category.dto';
import { FindFavoriteCategoryData } from '../dtos/find-favorite-category.dto';
import {
  RemoveFavoriteCategoryData,
  RemoveFavoriteCategoryResult,
} from '../dtos/remove-favorite-category.dto';
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
    const { parentId, currentUser, name, favorites: favoriteIds } = data;

    if (parentId) {
      const parentCategory = await this.findFavoriteCategoryEntity({
        id: parentId,
      });

      if (parentCategory.userId !== currentUser.id) {
        throw new ForbiddenException(
          `Unable to update another User's Category`,
        );
      }
    }

    try {
      const categoryToSave = this.favoriteCategoriesRepository.create({
        userId: currentUser.id,
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

  async removeFavoriteCategory(
    data: RemoveFavoriteCategoryData,
  ): Promise<RemoveFavoriteCategoryResult> {
    const { currentUser, categoryId } = data;

    const category = await this.findFavoriteCategoryEntity({
      id: categoryId,
    });

    if (category.userId !== currentUser.id) {
      throw new ForbiddenException(`Unable to delete another User's Category`);
    }

    try {
      await this.favoriteCategoriesRepository.delete(category.id);

      return {
        category: createFavoriteCategoryObjectFromEntity({
          favoriteCategoryEntity: category,
        }),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error when trying to remove Category',
        error,
      );
    }
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

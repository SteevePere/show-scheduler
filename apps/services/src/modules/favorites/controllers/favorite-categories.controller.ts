import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateFavoriteCategoryRequest,
  CreateFavoriteCategoryResponse,
  RemoveFavoriteCategoryRequest,
  RemoveFavoriteCategoryResponse,
  UpdateFavoriteCategoryRequest,
  UpdateFavoriteCategoryResponse,
  UserObject,
} from '@scheduler/shared';
import { CurrentAuthenticatedUser } from 'src/core/decorators/authenticated-user.decorator';
import { createFromClass } from 'src/core/utils/transformers.util';
import { CreateFavoriteCategoryData } from '../dtos/create-favorite-category.dto';
import { RemoveFavoriteCategoryData } from '../dtos/remove-favorite-category.dto';
import { UpdateFavoriteCategoryData } from '../dtos/update-favorite-category.dto';
import {
  ValidateCategoryOwnershipData,
  ValidateCategoryOwnershipResult,
} from '../dtos/validate-favorite-category-ownership.dto';
import { FavoriteCategoriesService } from '../services/favorite.categories.service';

@Controller('favorites/categories')
@ApiTags('Categories of Favorites')
export class FavoriteCategoriesController {
  constructor(public favoriteCategoriesService: FavoriteCategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Category of Favorites' })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: CreateFavoriteCategoryResponse,
  })
  async createFavoriteCategory(
    @CurrentAuthenticatedUser() currentUser: UserObject,
    @Body() data: CreateFavoriteCategoryRequest,
  ): Promise<CreateFavoriteCategoryResponse> {
    const { parentId } = data;

    if (parentId) {
      await this.validateCategoryOwnership({
        categoryId: parentId,
        currentUser,
        action: 'update',
      });
    }

    return await this.favoriteCategoriesService.createFavoriteCategory(
      createFromClass(CreateFavoriteCategoryData, {
        userId: currentUser.id,
        ...data,
      }),
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Category of Favorites' })
  @ApiBearerAuth()
  @ApiOkResponse({
    type: UpdateFavoriteCategoryResponse,
  })
  async updateFavoriteCategory(
    @CurrentAuthenticatedUser() currentUser: UserObject,
    @Param('id') id: string,
    @Body() data: UpdateFavoriteCategoryRequest,
  ): Promise<UpdateFavoriteCategoryResponse> {
    const { parentId } = data;

    if (parentId === id) {
      throw new BadRequestException('Category cannot be its own parent');
    }

    await this.validateCategoryOwnership({
      categoryId: id,
      currentUser,
      action: 'update',
    });

    if (parentId) {
      await this.validateCategoryOwnership({
        categoryId: parentId,
        currentUser,
        action: 'update',
      });
    }

    return this.favoriteCategoriesService.updateFavoriteCategory(
      createFromClass(UpdateFavoriteCategoryData, {
        id,
        ...data,
      }),
    );
  }

  @Delete()
  @ApiOperation({ summary: 'Remove a Category of Favorites' })
  @ApiBearerAuth()
  @ApiOkResponse({
    type: RemoveFavoriteCategoryResponse,
  })
  async removeFavoriteCategory(
    @CurrentAuthenticatedUser() currentUser: UserObject,
    @Body() data: RemoveFavoriteCategoryRequest,
  ): Promise<RemoveFavoriteCategoryResponse> {
    const { categoryId } = data;
    const { category } = await this.validateCategoryOwnership({
      categoryId,
      currentUser,
      action: 'delete',
    });

    return await this.favoriteCategoriesService.removeFavoriteCategory(
      createFromClass(RemoveFavoriteCategoryData, {
        category,
      }),
    );
  }

  private async validateCategoryOwnership(
    data: ValidateCategoryOwnershipData,
  ): Promise<ValidateCategoryOwnershipResult> {
    const { categoryId: id, currentUser, action } = data;
    const { category } =
      await this.favoriteCategoriesService.findFavoriteCategory({
        id,
      });

    if (category.userId !== currentUser.id) {
      throw new ForbiddenException(
        `Unable to ${action} another User's Category`,
      );
    }

    return { category };
  }
}

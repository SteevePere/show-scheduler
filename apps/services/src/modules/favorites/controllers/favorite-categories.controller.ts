import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateFavoriteCategoryRequest,
  CreateFavoriteCategoryResponse,
  UserObject,
} from '@scheduler/shared';
import { CurrentAuthenticatedUser } from 'src/core/decorators/authenticated-user.decorator';
import { createFromClass } from 'src/core/utils/transformers.util';
import { CreateFavoriteCategoryData } from '../dtos/create-favorite-category.dto';
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
    return await this.favoriteCategoriesService.createFavoriteCategory(
      createFromClass(CreateFavoriteCategoryData, {
        currentUser,
        ...data,
      }),
    );
  }
}

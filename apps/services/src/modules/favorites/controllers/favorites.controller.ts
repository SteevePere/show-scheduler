import { Body, Controller, Delete, Post } from '@nestjs/common';
import {
  CreateFavoriteRequest,
  CreateFavoriteResponse,
  RemoveFavoriteRequest,
  RemoveFavoriteResponse,
  UserObject,
} from '@scheduler/shared';
import { CurrentAuthenticatedUser } from 'src/core/decorators/authenticated-user.decorator';
import { createFromClass } from 'src/core/utils/transformers.util';
import { CreateFavoriteData } from '../dtos/create-favorite.dto';
import { RemoveFavoriteData } from '../dtos/remove-favorite.dtos';
import { FavoritesService } from '../services/favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(public favoritesService: FavoritesService) {}

  @Post()
  async saveFavorite(
    @CurrentAuthenticatedUser() currentUser: UserObject,
    @Body() data: CreateFavoriteRequest,
  ): Promise<CreateFavoriteResponse> {
    return await this.favoritesService.saveFavorite(
      createFromClass(CreateFavoriteData, {
        currentUser,
        ...data,
      }),
    );
  }

  @Delete()
  async removeFavorite(
    @CurrentAuthenticatedUser() currentUser: UserObject,
    @Body() data: RemoveFavoriteRequest,
  ): Promise<RemoveFavoriteResponse> {
    return await this.favoritesService.removeFavorite(
      createFromClass(RemoveFavoriteData, {
        currentUser,
        ...data,
      }),
    );
  }
}

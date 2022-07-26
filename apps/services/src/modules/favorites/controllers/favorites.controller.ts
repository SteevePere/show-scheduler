import { Body, Controller, Post } from '@nestjs/common';
import {
  CreateFavoriteRequest,
  CreateFavoriteResponse,
  UserObject,
} from '@scheduler/shared';
import { CurrentAuthenticatedUser } from 'src/core/decorators/authenticated-user.decorator';
import { createFromClass } from 'src/core/utils/transformers.util';
import { CreateFavoriteData } from '../dtos/create-favorite.dto';
import { FavoritesService } from '../services/favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(public favoritesService: FavoritesService) {}

  @Post()
  async createFavorite(
    @CurrentAuthenticatedUser() currentUser: UserObject,
    @Body() data: CreateFavoriteRequest,
  ): Promise<CreateFavoriteResponse> {
    return await this.favoritesService.createFavorite(
      createFromClass(CreateFavoriteData, {
        currentUser,
        ...data,
      }),
    );
  }
}

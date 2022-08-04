import { Body, Controller, Delete, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
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
import { UserFavoriteShowEntity } from '../entities/user-favorite-show.entity';
import { FavoritesService } from '../services/favorites.service';

@Crud({
  model: {
    type: UserFavoriteShowEntity,
  },
  query: {
    alwaysPaginate: true,
    join: {
      show: {
        eager: true,
      },
      'show.seasons': {
        eager: true,
      },
    },
  },
})
@CrudAuth({
  property: 'user',
  filter: (user: UserObject) => {
    return { userId: user.id };
  },
})
@Controller('favorites')
@ApiTags('Favorites')
export class FavoritesController
  implements CrudController<UserFavoriteShowEntity>
{
  constructor(public service: FavoritesService) {}

  @Post()
  async saveFavorite(
    @CurrentAuthenticatedUser() currentUser: UserObject,
    @Body() data: CreateFavoriteRequest,
  ): Promise<CreateFavoriteResponse> {
    return await this.service.saveFavorite(
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
    return await this.service.removeFavorite(
      createFromClass(RemoveFavoriteData, {
        currentUser,
        ...data,
      }),
    );
  }
}

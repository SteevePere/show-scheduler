import { Body, Controller, Delete, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import {
  CreateFavoriteRequest,
  CreateFavoriteResponse,
  FindFavoritesResponse,
  RemoveFavoriteRequest,
  RemoveFavoriteResponse,
  UserObject,
} from '@scheduler/shared';
import { CurrentAuthenticatedUser } from 'src/core/decorators/authenticated-user.decorator';
import { createFromClass } from 'src/core/utils/transformers.util';
import { CreateFavoriteData } from '../dtos/create-favorite.dto';
import { RemoveFavoriteData } from '../dtos/remove-favorite.dto';
import { UserFavoriteShowEntity } from '../entities/user-favorite-show.entity';
import { FavoritesService } from '../services/favorites.service';

@Crud({
  model: {
    type: UserFavoriteShowEntity,
  },
  routes: {
    only: ['getManyBase'],
    getManyBase: {
      decorators: [
        ApiBearerAuth(),
        ApiOperation({ summary: 'Retrieve User Favorites' }),
      ],
    },
  },
  query: {
    alwaysPaginate: true,
    join: {
      show: {
        eager: true,
      },
      'show.genres': {
        eager: true,
      },
    },
  },
  serialize: {
    getMany: FindFavoritesResponse,
  },
})
@CrudAuth({
  property: 'user',
  filter: (user: UserObject) => {
    return { userId: user.id };
  },
})
@Controller('favorites')
@ApiTags('User Favorites')
export class FavoritesController
  implements CrudController<UserFavoriteShowEntity>
{
  constructor(public service: FavoritesService) {}

  @Post()
  @ApiOperation({ summary: 'Save a Show as User Favorite' })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: CreateFavoriteResponse,
  })
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
  @ApiOperation({ summary: 'Remove a Show from User Favorites' })
  @ApiBearerAuth()
  @ApiOkResponse({
    type: RemoveFavoriteResponse,
  })
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

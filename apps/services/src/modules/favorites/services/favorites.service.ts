import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest, GetManyDefaultResponse } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ShowObject } from '@scheduler/shared';
import { ShowsService } from 'src/modules/shows/services/shows.service';
import { Repository } from 'typeorm';
import {
  CreateFavoriteData,
  CreateFavoriteResult,
} from '../dtos/create-favorite.dto';
import { FindUserFavoriteShowData } from '../dtos/find-favorite.dto';
import {
  RemoveFavoriteData,
  RemoveFavoriteResult,
} from '../dtos/remove-favorite.dto';
import {
  UpdateFavoriteData,
  UpdateFavoriteResult,
} from '../dtos/update-favorite.dto';
import { UserFavoriteShowEntity } from '../entities/user-favorite-show.entity';
import { createFavoriteObjectFromEntity } from '../transformers/favorite-object.transformer';

@Injectable()
export class FavoritesService extends TypeOrmCrudService<UserFavoriteShowEntity> {
  constructor(
    @InjectRepository(UserFavoriteShowEntity)
    private readonly userFavoriteShowsRepository: Repository<UserFavoriteShowEntity>,
    private readonly showsService: ShowsService,
  ) {
    super(userFavoriteShowsRepository);
  }

  async getMany(req: CrudRequest) {
    const response = (await super.getMany(
      req,
    )) as GetManyDefaultResponse<UserFavoriteShowEntity>;

    const favorites = response.data.map((favorite) => {
      favorite.show.genres = favorite.show.genres.map(
        (genre) => genre.name,
      ) as any;
      return favorite;
    });

    return { ...response, data: favorites };
  }

  async saveFavorite(data: CreateFavoriteData): Promise<CreateFavoriteResult> {
    const { currentUser, showExternalId, isNotificationEnabled } = data;
    let favoriteShow: ShowObject;

    const { show: existingShow } = await this.showsService.findShow({
      externalId: showExternalId,
      ignoreNotFound: true,
      onlyInternal: true,
    });

    if (existingShow) {
      favoriteShow = existingShow;
    } else {
      favoriteShow = (await this.createFavoriteAndRelations(data)).show;
    }

    try {
      await this.userFavoriteShowsRepository.save(
        this.userFavoriteShowsRepository.create({
          userId: currentUser.id,
          showId: favoriteShow.id,
          isNotificationEnabled,
        }),
      );

      const { show } = await this.showsService.updateShow({
        id: favoriteShow.id,
        data: { lastFavoritedAt: new Date() },
      });

      return { show };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error when trying to create favorite',
        error,
      );
    }
  }

  private async createFavoriteAndRelations(
    data: CreateFavoriteData,
  ): Promise<CreateFavoriteResult> {
    const { showExternalId } = data;

    const { show } = await this.showsService.saveShow({
      externalId: showExternalId,
    });

    const { seasons } = await this.showsService.saveShowSeasons({
      showId: show.id,
      showExternalId: show.externalId,
    });

    seasons.map((season) => {
      this.showsService.saveSeasonEpisodes({
        seasonId: season.id,
        seasonExternalId: season.externalId,
      });
    });

    return { show };
  }

  private async findUserFavoriteShowEntity(
    data: FindUserFavoriteShowData,
  ): Promise<UserFavoriteShowEntity> {
    const { userId, showId } = data;
    const foundUserFavorite = await this.userFavoriteShowsRepository.findOne({
      where: {
        userId,
        showId,
      },
      relations: ['show'],
    });

    if (!foundUserFavorite) {
      throw new NotFoundException('User Favorite not found');
    }

    return foundUserFavorite;
  }

  async removeFavorite(
    data: RemoveFavoriteData,
  ): Promise<RemoveFavoriteResult> {
    const { currentUser, showId } = data;

    try {
      const { show } = await this.showsService.findShow({
        id: showId,
        onlyInternal: true,
      });

      const favorite = await this.findUserFavoriteShowEntity({
        userId: currentUser.id,
        showId,
      });

      await this.userFavoriteShowsRepository.delete(favorite.id);

      return { show };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error when trying to remove Favorite',
        error,
      );
    }
  }

  async updateFavorite(
    data: UpdateFavoriteData,
  ): Promise<UpdateFavoriteResult> {
    const favorite = await this.userFavoriteShowsRepository.findOne({
      where: { id: data.id },
    });
    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }
    try {
      Object.assign(favorite, { ...data.data });
      const savedFavorite = await this.userFavoriteShowsRepository.save(
        favorite,
      );
      return {
        favorite: createFavoriteObjectFromEntity({
          favoriteEntity: savedFavorite,
        }),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Unable to update Favorite',
        error,
      );
    }
  }
}

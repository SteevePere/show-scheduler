import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShowObject } from '@scheduler/shared';
import { ShowsService } from 'src/modules/shows/services/shows.service';
import { Repository } from 'typeorm';
import {
  CreateFavoriteData,
  CreateFavoriteResult,
} from '../dtos/create-favorite.dto';
import { UserFavoriteShowEntity } from '../entities/user-show.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(UserFavoriteShowEntity)
    private readonly userFavoriteShowsRepository: Repository<UserFavoriteShowEntity>,
    private readonly showsService: ShowsService,
  ) {}

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
      this.userFavoriteShowsRepository.save(
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
}

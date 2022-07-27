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

  async createFavorite(
    data: CreateFavoriteData,
  ): Promise<CreateFavoriteResult> {
    const { currentUser, showExternalId, isNotificationEnabled } = data;
    let favoriteShow: ShowObject;

    const findShowResult = await this.showsService.findShow({
      externalId: showExternalId,
      ignoreNotFound: true,
      onlyInternal: true,
    });

    if (findShowResult) {
      favoriteShow = findShowResult.show;
    } else {
      const saveShowResult = await this.showsService.saveShow({
        externalId: showExternalId,
      });
      favoriteShow = saveShowResult.show;
      const { seasons } = await this.showsService.saveShowSeasons({
        showId: favoriteShow.id,
        showExternalId: favoriteShow.externalId,
      });
      seasons.map((season) => {
        this.showsService.saveSeasonEpisodes({
          seasonId: season.id,
          seasonExternalId: season.externalId,
        });
      });
    }

    try {
      const favorite = this.userFavoriteShowsRepository.create({
        userId: currentUser.id,
        showId: favoriteShow.id,
        isNotificationEnabled,
      });
      await this.userFavoriteShowsRepository.save(favorite);

      return { show: favoriteShow };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error when trying to create favorite',
        error,
      );
    }
  }
}

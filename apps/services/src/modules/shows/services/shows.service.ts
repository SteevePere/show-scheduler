import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShowObject } from '@scheduler/shared';
import { DataProviderService } from 'src/modules/data-provider/services/data-provider.service';
import { FavoritesService } from 'src/modules/favorites/services/favorites.service';
import { FilesService } from 'src/modules/files/services/files.service';
import { Connection, DeepPartial, Repository } from 'typeorm';
import { DeleteObsoleteShowsData } from '../dtos/delete-obsolete-shows.dto';
import { DeleteShowsData } from '../dtos/delete-shows.dto';
import {
  FindObsoleteShowsData,
  FindObsoleteShowsResult,
} from '../dtos/find-obsolete-shows.dto';
import { FindShowGenreData } from '../dtos/find-show-genre.dto';
import { FindShowData, FindShowResult } from '../dtos/find-show.dto';
import {
  FindUpcomingEpisodesData,
  FindUpcomingEpisodesResult,
} from '../dtos/find-upcoming-episodes.dto';
import {
  SaveSeasonEpisodesData,
  SaveSeasonEpisodesResult,
} from '../dtos/save-season-episodes.dto';
import { SaveShowGenreData } from '../dtos/save-show-genre.dto';
import {
  SaveShowSeasonsData,
  SaveShowSeasonsResult,
} from '../dtos/save-show-seasons.dto';
import { SaveShowData, SaveShowResult } from '../dtos/save-show.dto';
import { SearchShowsData, SearchShowsResult } from '../dtos/search-shows.dto';
import { UpdateShowData, UpdateShowResult } from '../dtos/update-show.dto';
import { GenreEntity } from '../entities/genre.entity';
import { ShowEntity } from '../entities/show.entity';
import { createShowObjectFromEntity } from '../transformers/show-object.transformer';
import { EpisodesService } from './episodes.service';
import { SeasonsService } from './seasons.service';
import { SeasonEntity } from '../entities/season.entity';
import { createSeasonObjectFromEntity } from '../transformers/season-object.transformer';

@Injectable()
export class ShowsService {
  constructor(
    private readonly databaseConnection: Connection,
    @InjectRepository(ShowEntity)
    private readonly showsRepository: Repository<ShowEntity>,
    @InjectRepository(GenreEntity)
    private readonly genresRepository: Repository<GenreEntity>,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    private readonly dataProviderService: DataProviderService,
    private readonly seasonsService: SeasonsService,
    private readonly episodesService: EpisodesService,
    private readonly filesService: FilesService,
  ) {}

  async searchExternalShows(data: SearchShowsData): Promise<SearchShowsResult> {
    const { currentUser } = data;
    const { shows } = await this.dataProviderService.searchShows(data);

    const consolidatedShows = await Promise.all(
      shows.map(async (externalShow: ShowObject) => {
        const { show: internalShow } = await this.findShow({
          externalId: externalShow.externalId,
          currentUser,
          ignoreNotFound: true, // Do not throw if not found
          onlyInternal: true, // Do not fetch externally if not found
        });
        // If show found internally, return intern object with isFavorited.
        // Otherwise, return external Show as is.
        return internalShow || externalShow;
      }),
    );

    return { shows: consolidatedShows };
  }

  async findShow(data: FindShowData): Promise<FindShowResult> {
    const {
      externalId,
      currentUser,
      ignoreNotFound = false,
      onlyInternal = false,
    } = data;

    const savedShow = await this.findShowEntity({
      ...data,
      ignoreNotFound,
      relations: ['seasons'],
      order: {
        seasons: {
          number: 'ASC',
        },
      },
    });

    if (!savedShow) {
      // The Show does not exist in DB
      if (!onlyInternal) {
        // We want to fetch the Show from the third party
        const { show } = await this.dataProviderService.findShow({
          externalId,
        });
        const { seasons } = await this.seasonsService.findShowSeasons({
          showExternalId: show.externalId,
        });
        show.seasons = seasons;
        return { show };
      }
      return { show: null };
    }

    const seasons = await Promise.all(
      savedShow.seasons.map(async (seasonEntity: SeasonEntity) => {
        const { isWatchedByUser } = currentUser
          ? await this.seasonsService.isSeasonWatched({
              seasonEntity,
              currentUser,
            })
          : { isWatchedByUser: false };
        return createSeasonObjectFromEntity({
          seasonEntity,
          isWatchedByUser,
        });
      }),
    );

    const isFavoritedByUser = currentUser
      ? await this.favoritesService.isShowUserFavorite({
          showId: savedShow.id,
          userId: currentUser.id,
        })
      : false;

    const show = createShowObjectFromEntity({
      showEntity: savedShow,
      isFavoritedByUser,
    });

    show.seasons = seasons;

    return { show };
  }

  private async findShowEntity(data: FindShowData): Promise<ShowEntity> {
    const {
      id,
      externalId,
      ignoreNotFound = false,
      relations = [],
      order,
    } = data;

    const foundShow = await this.showsRepository.findOne({
      where: [{ id }, { externalId }],
      relations,
      order,
    });

    if (!foundShow && !ignoreNotFound) {
      throw new NotFoundException('Show not found');
    }

    return foundShow;
  }

  async saveShow(data: SaveShowData): Promise<SaveShowResult> {
    const { externalId } = data;

    const { show: externalShow } = await this.dataProviderService.findShow({
      externalId,
    });
    const {
      name,
      summary,
      language,
      rating,
      imageUrl,
      genres: stringGenres,
    } = externalShow;

    const genres = await this.findOrSaveShowGenreEntities({
      names: stringGenres,
    });

    const imageResult = imageUrl
      ? await this.filesService.saveFile({
          filePath: imageUrl,
        })
      : null;

    const image = imageResult ? imageResult.file : null;

    const showToSave = this.showsRepository.create({
      externalId,
      name,
      summary,
      language,
      rating,
      imageId: image?.id || null,
      genres,
    });
    const showEntity = await this.showsRepository.save(showToSave);

    return {
      show: createShowObjectFromEntity({
        showEntity,
        imageUrl: image?.filePath || null,
      }),
    };
  }

  async saveShowSeasons(
    data: SaveShowSeasonsData,
  ): Promise<SaveShowSeasonsResult> {
    return this.seasonsService.saveShowSeasons(data);
  }

  async saveSeasonEpisodes(
    data: SaveSeasonEpisodesData,
  ): Promise<SaveSeasonEpisodesResult> {
    return this.episodesService.saveSeasonEpisodes(data);
  }

  private async findOrSaveShowGenreEntities(
    data: SaveShowGenreData,
  ): Promise<GenreEntity[]> {
    return await Promise.all(
      data.names.map(async (name) => {
        const savedGenre = await this.findShowGenreEntity({
          name,
          ignoreNotFound: true,
        });
        if (!savedGenre) {
          const newGenre = this.genresRepository.create({ name });
          return await this.genresRepository.save(newGenre);
        }
        return savedGenre;
      }),
    );
  }

  private async findShowGenreEntity(
    data: FindShowGenreData,
  ): Promise<GenreEntity> {
    const { id, name, ignoreNotFound = false } = data;
    const foundGenre = await this.genresRepository.findOne({
      where: [{ id }, { name }],
    });

    if (!foundGenre && !ignoreNotFound) {
      throw new NotFoundException('Genre not found');
    }

    return foundGenre;
  }

  async updateShow(data: UpdateShowData): Promise<UpdateShowResult> {
    const show = await this.findShowEntity({ id: data.id });

    try {
      Object.assign<ShowEntity, DeepPartial<ShowEntity>>(show, {
        ...data.data,
      });
      const savedShow = await this.showsRepository.save(show);

      return { show: createShowObjectFromEntity({ showEntity: savedShow }) };
    } catch (error) {
      throw new InternalServerErrorException('Unable to update Show', error);
    }
  }

  async findObsoleteShows(
    data: FindObsoleteShowsData,
  ): Promise<FindObsoleteShowsResult> {
    const { obsoleteFrom } = data;

    return {
      obsoleteShows: await this.databaseConnection
        .createQueryBuilder()
        .from(ShowEntity, 'show')
        .select('show')
        .leftJoinAndSelect('show.userFavoriteReferences', 'favorite')
        .where('favorite.id IS NULL')
        .andWhere('show.lastFavoritedAt < :obsoleteFrom', { obsoleteFrom })
        .getMany(),
    };
  }

  private async deleteShows(data: DeleteShowsData): Promise<void> {
    const { shows } = data;
    await this.databaseConnection.getRepository(ShowEntity).remove(shows);
  }

  async deleteObsoleteShows(data: DeleteObsoleteShowsData): Promise<void> {
    await this.deleteShows(data);
  }

  async findUpcomingEpisodes(
    data: FindUpcomingEpisodesData,
  ): Promise<FindUpcomingEpisodesResult> {
    return this.episodesService.findUpcomingEpisodes(data);
  }
}

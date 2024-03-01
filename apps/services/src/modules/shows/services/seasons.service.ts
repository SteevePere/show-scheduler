import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataProviderService } from 'src/modules/data-provider/services/data-provider.service';
import { FilesService } from 'src/modules/files/services/files.service';
import { Connection, Repository } from 'typeorm';
import {
  FindSeasonEpisodesData,
  FindSeasonEpisodesResult,
} from '../dtos/find-season-episodes.dto';
import { FindSeasonData } from '../dtos/find-season.dto';
import {
  FindShowSeasonsData,
  FindShowSeasonsResult,
} from '../dtos/find-show-seasons.dto';
import {
  IsSeasonWatchedData,
  IsSeasonWatchedResult,
} from '../dtos/is-season-watched.dto';
import {
  SaveShowSeasonsData,
  SaveShowSeasonsResult,
} from '../dtos/save-show-seasons.dto';
import {
  ToggleSeasonWatchedData,
  ToggleSeasonWatchedResult,
} from '../dtos/toggle-season-watched.dto';
import { EpisodeEntity } from '../entities/episode.entity';
import { SeasonEntity } from '../entities/season.entity';
import { createSeasonObjectFromEntity } from '../transformers/season-object.transformer';
import { EpisodesService } from './episodes.service';

@Injectable()
export class SeasonsService {
  constructor(
    private readonly databaseConnection: Connection,
    @InjectRepository(SeasonEntity)
    private readonly seasonsRepository: Repository<SeasonEntity>,
    private readonly dataProviderService: DataProviderService,
    @Inject(forwardRef(() => EpisodesService))
    private readonly episodesService: EpisodesService,
    private readonly filesService: FilesService,
  ) {}

  private async findSeasonEntity(data: FindSeasonData): Promise<SeasonEntity> {
    const { id, externalId, relations = [], ignoreNotFound = false } = data;
    const foundSeason = await this.seasonsRepository.findOne({
      where: [{ id }, { externalId }],
      relations,
    });

    if (!foundSeason && !ignoreNotFound) {
      throw new NotFoundException('Season not found');
    }

    return foundSeason;
  }

  async findShowSeasons(
    data: FindShowSeasonsData,
  ): Promise<FindShowSeasonsResult> {
    const { showExternalId } = data;
    return await this.dataProviderService.findShowSeasons({
      showExternalId,
    });
  }

  async findSeasonEpisodes(
    data: FindSeasonEpisodesData,
  ): Promise<FindSeasonEpisodesResult> {
    const { seasonExternalId, currentUser } = data;
    const season = await this.findSeasonEntity({
      externalId: seasonExternalId,
      ignoreNotFound: true,
    });
    return this.episodesService.findSeasonEpisodes({
      seasonExternalId,
      season,
      currentUser,
    });
  }

  async saveShowSeasons(
    data: SaveShowSeasonsData,
  ): Promise<SaveShowSeasonsResult> {
    const { showId, showExternalId } = data;

    const { seasons: externalSeasons } = await this.findShowSeasons({
      showExternalId,
    });

    const seasons = await Promise.all(
      externalSeasons.map(async (externalSeason) => {
        const {
          externalId,
          name,
          number,
          summary,
          imageUrl,
          premiereDate,
          endDate,
        } = externalSeason;

        const imageResult = imageUrl
          ? await this.filesService.saveFile({
              filePath: imageUrl,
            })
          : null;

        const image = imageResult ? imageResult.file : null;

        const seasonToSave = this.seasonsRepository.create({
          showId,
          externalId,
          name,
          number,
          summary,
          imageId: image?.id || null,
          premiereDate,
          endDate,
        });
        const seasonEntity = await this.seasonsRepository.save(seasonToSave);

        return createSeasonObjectFromEntity({
          seasonEntity,
          imageUrl: image?.filePath || null,
        });
      }),
    );

    return { seasons };
  }

  async toggleSeasonWatched(
    data: ToggleSeasonWatchedData,
  ): Promise<ToggleSeasonWatchedResult> {
    const { currentUser, isWatched } = data;

    const seasonEntity = await this.findSeasonEntity({
      ...data,
      relations: ['episodes'],
    });

    await Promise.all(
      seasonEntity.episodes.map(async (episode) => {
        await this.episodesService.toggleEpisodeWatched({
          id: episode.id,
          currentUser,
          isWatched,
        });
      }),
    );

    return {
      season: createSeasonObjectFromEntity({
        seasonEntity,
      }),
    };
  }

  async isSeasonWatched(
    data: IsSeasonWatchedData,
  ): Promise<IsSeasonWatchedResult> {
    const {
      currentUser,
      seasonEntity: { id: seasonId },
    } = data;

    if (!currentUser) return { isWatchedByUser: false };

    const seasonEpisodeCount = await this.databaseConnection
      .createQueryBuilder()
      .from(EpisodeEntity, 'episode')
      .select('episode')
      .where('episode.seasonId = :seasonId', { seasonId })
      .getCount();

    const watchedEpisodesCount = await this.databaseConnection
      .createQueryBuilder()
      .from(EpisodeEntity, 'episode')
      .select('episode')
      .leftJoin('episode.season', 'season')
      .leftJoin('episode.watchedBy', 'user')
      .where('user.id = :userId', { userId: currentUser.id })
      .andWhere('season.id = :seasonId', { seasonId })
      .getCount();

    return { isWatchedByUser: seasonEpisodeCount === watchedEpisodesCount };
  }
}

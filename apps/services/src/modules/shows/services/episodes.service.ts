import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { fromJsDateToHumanReadable } from '@scheduler/shared';
import { DataProviderService } from 'src/modules/data-provider/services/data-provider.service';
import { FilesService } from 'src/modules/files/services/files.service';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Connection, DeepPartial, Repository } from 'typeorm';
import { FindEpisodeData } from '../dtos/find-episode.dto';
import {
  FindEpisodesData,
  FindEpisodesResult,
} from '../dtos/find-episodes.dto';
import {
  FindSeasonEpisodesData,
  FindSeasonEpisodesResult,
} from '../dtos/find-season-episodes.dto';
import {
  FindUpcomingEpisodesData,
  FindUpcomingEpisodesResult,
} from '../dtos/find-upcoming-episodes.dto';
import {
  isEpisodeWatchedData,
  isEpisodeWatchedResult,
} from '../dtos/is-episode-watched.dto';
import {
  SaveSeasonEpisodesData,
  SaveSeasonEpisodesResult,
} from '../dtos/save-season-episodes.dto';
import {
  ToggleEpisodeWatchedData,
  ToggleEpisodeWatchedResult,
} from '../dtos/toggle-episode-watched.dto';
import {
  UpdateEpisodeData,
  UpdateEpisodeResult,
} from '../dtos/update-episode.dto';
import { EpisodeEntity } from '../entities/episode.entity';
import { IUpcomingEpisode } from '../interfaces/upcoming-episode.interface';
import { createEpisodeObjectFromEntity } from '../transformers/episode-object.transformer';
import { SeasonsService } from './seasons.service';

@Injectable()
export class EpisodesService {
  constructor(
    private readonly databaseConnection: Connection,
    @InjectRepository(EpisodeEntity)
    private readonly episodesRepository: Repository<EpisodeEntity>,
    @Inject(forwardRef(() => SeasonsService))
    private readonly seasonsService: SeasonsService,
    private readonly filesService: FilesService,
    private readonly dataProviderService: DataProviderService,
  ) {}

  async saveSeasonEpisodes(
    data: SaveSeasonEpisodesData,
  ): Promise<SaveSeasonEpisodesResult> {
    const { seasonId, seasonExternalId } = data;

    const { episodes: externalEpisodes } =
      await this.seasonsService.findSeasonEpisodes({
        seasonExternalId,
      });

    const episodes = await Promise.all(
      externalEpisodes.map(async (externalEpisode) => {
        const { externalId, name, number, summary, imageUrl, airDate } =
          externalEpisode;

        const imageResult = imageUrl
          ? await this.filesService.saveFile({
              filePath: imageUrl,
            })
          : null;

        const image = imageResult ? imageResult.file : null;

        const episodeToSave = this.episodesRepository.create({
          seasonId,
          externalId,
          name,
          number,
          summary,
          imageId: image?.id || null,
          airDate,
        });
        const episodeEntity = await this.episodesRepository.save(episodeToSave);

        return createEpisodeObjectFromEntity({
          episodeEntity,
          imageUrl: image?.filePath || null,
        });
      }),
    );

    return { episodes };
  }

  async findSeasonEpisodes(
    data: FindSeasonEpisodesData,
  ): Promise<FindSeasonEpisodesResult> {
    const { season, seasonExternalId, currentUser } = data;
    let episodes = [];

    if (season) {
      const findEpisodesResult = await this.findEpisodeEntities({
        where: [{ seasonId: season.id }],
        relations: ['watchedBy'],
        order: {
          number: 'ASC',
        },
      });
      episodes = findEpisodesResult.episodes;
    }

    if (!season || !episodes.length) {
      // they can't be watched by current user since they're not even in db, so we can return directly
      return this.dataProviderService.findSeasonEpisodes({
        seasonExternalId,
      });
    }

    const consolidatedEpisodes = await Promise.all(
      episodes.map(async (episodeEntity: EpisodeEntity) => {
        const { isWatchedByUser } = await this.isEpisodeWatched({
          episodeEntity,
          currentUser,
        });
        const episodeObject = createEpisodeObjectFromEntity({ episodeEntity });
        episodeObject.isWatchedByUser = isWatchedByUser;

        return episodeObject;
      }),
    );

    return { episodes: consolidatedEpisodes };
  }

  async toggleEpisodeWatched(
    data: ToggleEpisodeWatchedData,
  ): Promise<ToggleEpisodeWatchedResult> {
    const { currentUser, isWatched } = data;

    // will throw if not found
    const episodeEntity = await this.findEpisodeEntity({
      ...data,
      relations: ['watchedBy'],
    });

    if (isWatched && new Date(episodeEntity.airDate) > new Date()) {
      throw new BadRequestException(
        'Error when trying to mark episode as watched: Air date is in the future',
      );
    }

    const currentUserEntity = new UserEntity();
    currentUserEntity.id = currentUser.id;

    if (isWatched) {
      Object.assign<EpisodeEntity, DeepPartial<EpisodeEntity>>(episodeEntity, {
        watchedBy: [currentUserEntity],
      });
    } else {
      episodeEntity.watchedBy = episodeEntity.watchedBy.filter((watcher) => {
        watcher.id !== currentUser.id;
      });
    }

    await this.episodesRepository.save(episodeEntity);

    const episode = createEpisodeObjectFromEntity({
      episodeEntity,
    });

    episode.isWatchedByUser = isWatched;

    return { episode };
  }

  async isEpisodeWatched(
    data: isEpisodeWatchedData,
  ): Promise<isEpisodeWatchedResult> {
    const { episodeEntity, currentUser } = data;
    if (!currentUser) return { isWatchedByUser: false };
    if (!episodeEntity.watchedBy) {
      throw new BadRequestException('watchedBy relation is absent from entity');
    }
    const isWatchedByUser = episodeEntity.watchedBy.some(
      (watcher) => watcher.id === currentUser.id,
    );
    return { isWatchedByUser };
  }

  async updateEpisode(data: UpdateEpisodeData): Promise<UpdateEpisodeResult> {
    const episode = await this.findEpisodeEntity({ id: data.id });

    try {
      Object.assign<EpisodeEntity, DeepPartial<EpisodeEntity>>(episode, {
        ...data.data,
      });
      const savedEpisode = await this.episodesRepository.save(episode);

      return {
        episode: createEpisodeObjectFromEntity({ episodeEntity: savedEpisode }),
      };
    } catch (error) {
      throw new InternalServerErrorException('Unable to update Episode', error);
    }
  }

  private async findEpisodeEntity(
    data: FindEpisodeData,
  ): Promise<EpisodeEntity> {
    const { id, externalId, relations = [], ignoreNotFound = false } = data;
    const foundEpisode = await this.episodesRepository.findOne({
      where: [{ id }, { externalId }],
      relations,
    });

    if (!foundEpisode && !ignoreNotFound) {
      throw new NotFoundException('Episode not found');
    }

    return foundEpisode;
  }

  async findEpisodeEntities(
    data: FindEpisodesData,
  ): Promise<FindEpisodesResult> {
    const episodes = await this.episodesRepository.find({
      ...data,
    });
    return { episodes };
  }

  async findUpcomingEpisodes(
    data: FindUpcomingEpisodesData,
  ): Promise<FindUpcomingEpisodesResult> {
    const rawEpisodes: IUpcomingEpisode[] = await this.databaseConnection.query(
      `SELECT 
      DISTINCT ON (episodes.id)
      episodes.id, 
      episodes.name AS "episodeName", 
      episodes.number AS "episodeNumber", 
      episodes.summary AS "episodeSummary", 
      episodes."airDate" AS "episodeAirDate", 
      seasons.number AS "seasonNumber", 
      shows.name AS "showName",
      users.email AS "userEmail", 
      users."firstName" AS "userFirstName" 
      FROM 
      episodes 
      INNER JOIN seasons ON episodes."seasonId" = seasons.id 
      INNER JOIN shows ON seasons."showId" = shows.id 
      LEFT JOIN user_favorite_shows ON shows.id = user_favorite_shows."showId" 
      INNER JOIN users ON user_favorite_shows."userId" = users.id 
      WHERE 
      episodes."airDate" BETWEEN NOW() 
      AND NOW() + $1 :: interval 
      AND user_favorite_shows."isNotificationEnabled" = true;`,
      [data.period],
    );

    const upcomingEpisodes = rawEpisodes.map((episode) => {
      return {
        ...episode,
        episodeAirDate: fromJsDateToHumanReadable(
          new Date(episode.episodeAirDate),
        ),
      };
    });

    return { upcomingEpisodes };
  }
}

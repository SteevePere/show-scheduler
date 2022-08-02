import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataProviderService } from 'src/modules/data-provider/services/data-provider.service';
import { FilesService } from 'src/modules/files/services/files.service';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { FindEpisodeData } from '../dtos/find-episode.dto';
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
import { createEpisodeObjectFromEntity } from '../transformers/episode-object.transformer';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(EpisodeEntity)
    private readonly episodesRepository: Repository<EpisodeEntity>,
    private readonly dataProviderService: DataProviderService,
    private readonly filesService: FilesService,
  ) {}

  async saveSeasonEpisodes(
    data: SaveSeasonEpisodesData,
  ): Promise<SaveSeasonEpisodesResult> {
    const { seasonId, seasonExternalId } = data;

    const { episodes: externalEpisodes } =
      await this.dataProviderService.findSeasonEpisodes({
        seasonExternalId,
      });

    const episodes = await Promise.all(
      externalEpisodes.map(async (externalEpisode) => {
        const { externalId, name, number, summary, imageUrl, airDate } =
          externalEpisode;

        const { file: image } = await this.filesService.saveFile({
          filePath: imageUrl,
        });

        const episodeToSave = this.episodesRepository.create({
          seasonId,
          externalId,
          name,
          number,
          summary,
          imageId: image.id,
          airDate,
        });
        const episodeEntity = await this.episodesRepository.save(episodeToSave);

        return createEpisodeObjectFromEntity({
          episodeEntity,
          imageUrl: image.filePath,
        });
      }),
    );

    return { episodes };
  }

  async toggleEpisodeWatched(
    data: ToggleEpisodeWatchedData,
  ): Promise<ToggleEpisodeWatchedResult> {
    const { currentUser, isWatched } = data;

    const episodeEntity = await this.findEpisodeEntity({
      ...data,
      relations: ['watchedBy'],
    });
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

    return {
      episode: createEpisodeObjectFromEntity({
        episodeEntity,
      }),
    };
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
}

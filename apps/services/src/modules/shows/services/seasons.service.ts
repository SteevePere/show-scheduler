import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataProviderService } from 'src/modules/data-provider/services/data-provider.service';
import { FilesService } from 'src/modules/files/services/files.service';
import { Repository } from 'typeorm';
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
  SaveShowSeasonsData,
  SaveShowSeasonsResult,
} from '../dtos/save-show-seasons.dto';
import {
  ToggleSeasonWatchedData,
  ToggleSeasonWatchedResult,
} from '../dtos/toggle-season-watched.dto';
import { SeasonEntity } from '../entities/season.entity';
import { createSeasonObjectFromEntity } from '../transformers/season-object.transformer';
import { EpisodesService } from './episodes.service';

@Injectable()
export class SeasonsService {
  constructor(
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
    const { seasonExternalId } = data;
    return await this.dataProviderService.findSeasonEpisodes({
      seasonExternalId,
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
}

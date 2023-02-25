import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataProviderService } from 'src/modules/data-provider/services/data-provider.service';
import { FilesService } from 'src/modules/files/services/files.service';
import { Repository } from 'typeorm';
import { FindSeasonData } from '../dtos/find-season.dto';
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

  async saveShowSeasons(
    data: SaveShowSeasonsData,
  ): Promise<SaveShowSeasonsResult> {
    const { showId, showExternalId } = data;

    const { seasons: externalSeasons } =
      await this.dataProviderService.findShowSeasons({
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

        const { file: image } = imageUrl
          ? await this.filesService.saveFile({
              filePath: imageUrl,
            })
          : null;

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

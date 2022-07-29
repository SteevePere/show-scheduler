import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataProviderService } from 'src/modules/data-provider/services/data-provider.service';
import { FilesService } from 'src/modules/files/services/files-service';
import { Repository } from 'typeorm';
import { FindSeasonData } from '../dtos/find-season.dto';
import {
  SaveShowSeasonsData,
  SaveShowSeasonsResult,
} from '../dtos/save-show-seasons.dto';
import { SeasonEntity } from '../entities/season.entity';
import { createSeasonObjectFromEntity } from '../transformers/season-object.transformer';

@Injectable()
export class SeasonsService {
  constructor(
    @InjectRepository(SeasonEntity)
    private readonly seasonsRepository: Repository<SeasonEntity>,
    private readonly dataProviderService: DataProviderService,
    private readonly filesService: FilesService,
  ) {}

  private async findSeasonEntity(data: FindSeasonData): Promise<SeasonEntity> {
    const { id, externalId, ignoreNotFound = false } = data;
    const foundSeason = await this.seasonsRepository.findOne({
      where: [{ id }, { externalId }],
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

        const { file: image } = await this.filesService.saveFile({
          filePath: imageUrl,
        });

        const seasonToSave = this.seasonsRepository.create({
          showId,
          externalId,
          name,
          number,
          summary,
          imageId: image.id,
          premiereDate,
          endDate,
        });
        const seasonEntity = await this.seasonsRepository.save(seasonToSave);

        return createSeasonObjectFromEntity({
          seasonEntity,
          imageUrl: image.filePath,
        });
      }),
    );

    return { seasons };
  }
}

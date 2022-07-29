import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataProviderService } from 'src/modules/data-provider/services/data-provider.service';
import { FilesService } from 'src/modules/files/services/files-service';
import { Repository } from 'typeorm';
import {
  SaveSeasonEpisodesData,
  SaveSeasonEpisodesResult,
} from '../dtos/save-season-episodes.dto';
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
}

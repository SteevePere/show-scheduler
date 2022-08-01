import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataProviderService } from 'src/modules/data-provider/services/data-provider.service';
import { FilesService } from 'src/modules/files/services/files-service';
import { DeepPartial, Repository } from 'typeorm';
import { FindShowGenreData } from '../dtos/find-show-genre.dto';
import { FindShowData, FindShowResult } from '../dtos/find-show.dto';
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

@Injectable()
export class ShowsService {
  constructor(
    @InjectRepository(ShowEntity)
    private readonly showsRepository: Repository<ShowEntity>,
    @InjectRepository(GenreEntity)
    private readonly genresRepository: Repository<GenreEntity>,
    private readonly dataProviderService: DataProviderService,
    private readonly seasonsService: SeasonsService,
    private readonly episodesService: EpisodesService,
    private readonly filesService: FilesService,
  ) {}

  async searchExternalShows(data: SearchShowsData): Promise<SearchShowsResult> {
    return this.dataProviderService.searchShows(data);
  }

  async findShow(data: FindShowData): Promise<FindShowResult> {
    const { externalId, ignoreNotFound = false, onlyInternal = false } = data;

    const savedShow = await this.findShowEntity({
      ...data,
      ignoreNotFound,
    });
    if (!savedShow) {
      if (!onlyInternal) {
        return this.dataProviderService.findShow({ externalId });
      }
      return { show: null };
    }

    return { show: createShowObjectFromEntity({ showEntity: savedShow }) };
  }

  private async findShowEntity(data: FindShowData): Promise<ShowEntity> {
    const { id, externalId, ignoreNotFound = false } = data;
    const foundShow = await this.showsRepository.findOne({
      where: [{ id }, { externalId }],
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
    const { file: image } = await this.filesService.saveFile({
      filePath: imageUrl,
    });

    const showToSave = this.showsRepository.create({
      externalId,
      name,
      summary,
      language,
      rating,
      imageId: image.id,
      genres,
    });
    const showEntity = await this.showsRepository.save(showToSave);

    return {
      show: createShowObjectFromEntity({
        showEntity,
        imageUrl: image.filePath,
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

  async findOrSaveShowGenreEntities(
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
}

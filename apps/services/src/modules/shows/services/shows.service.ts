import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataProviderService } from 'src/modules/data-provider/services/data-provider.service';
import { Repository } from 'typeorm';
import { CreateShowGenreData } from '../dtos/create-show-genre.dto';
import { FindShowGenreData } from '../dtos/find-show-genre.dto';
import { FindShowData, FindShowResult } from '../dtos/find-show.dto';
import { SaveShowData, SaveShowResult } from '../dtos/save-show.dto';
import { SearchShowsData, SearchShowsResult } from '../dtos/search-shows.dto';
import { GenreEntity } from '../entities/genre.entity';
import { ShowEntity } from '../entities/show.entity';
import { createShowObjectFromEntity } from '../transformers/show-object.transformer';

@Injectable()
export class ShowsService {
  constructor(
    @InjectRepository(ShowEntity)
    private readonly showsRepository: Repository<ShowEntity>,
    @InjectRepository(GenreEntity)
    private readonly genresRepository: Repository<GenreEntity>,
    private readonly dataProviderService: DataProviderService,
  ) {}

  async searchShows(data: SearchShowsData): Promise<SearchShowsResult> {
    return this.dataProviderService.searchShows(data);
  }

  async findShow(data: FindShowData): Promise<FindShowResult> {
    const savedShow = await this.findShowEntity({
      ...data,
      ignoreNotFound: true,
    });
    if (!savedShow) {
      return this.dataProviderService.findShow({ externalId: data.externalId });
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
      genres: stringGenres,
    } = externalShow;

    const genres = await this.findOrCreateShowGenreEntities({
      names: stringGenres,
    });

    const showToSave = this.showsRepository.create({
      externalId,
      name,
      summary,
      language,
      rating,
      genres,
    });
    const showEntity = await this.showsRepository.save(showToSave);

    return {
      show: createShowObjectFromEntity({
        showEntity,
      }),
    };
  }

  async findOrCreateShowGenreEntities(
    data: CreateShowGenreData,
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
}

import { Inject, Injectable } from '@nestjs/common';
import {
  FindShowData,
  FindShowResult,
} from 'src/modules/shows/dtos/find-show.dto';
import {
  SearchShowsData,
  SearchShowsResult,
} from 'src/modules/shows/dtos/search-shows.dto';
import { DataProviderAbstractService } from './abstract/data-provider.abstract-service';

@Injectable()
export class DataProviderService implements DataProviderAbstractService {
  constructor(
    @Inject('EXTERNAL_DATA_PROVIDER_SERVICE')
    private readonly service: DataProviderAbstractService,
  ) {}

  async searchShows(data: SearchShowsData): Promise<SearchShowsResult> {
    return this.service.searchShows(data);
  }

  async findShow(data: FindShowData): Promise<FindShowResult> {
    return this.service.findShow(data);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import {
  FindSeasonEpisodesData,
  FindSeasonEpisodesResult,
} from 'src/modules/shows/dtos/find-season-episodes.dto';
import {
  FindShowSeasonsData,
  FindShowSeasonsResult,
} from 'src/modules/shows/dtos/find-show-seasons.dto';
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
    private readonly providerService: DataProviderAbstractService,
  ) {}

  async searchShows(data: SearchShowsData): Promise<SearchShowsResult> {
    return this.providerService.searchShows(data);
  }

  async findShow(data: FindShowData): Promise<FindShowResult> {
    return this.providerService.findShow(data);
  }

  async findShowSeasons(
    data: FindShowSeasonsData,
  ): Promise<FindShowSeasonsResult> {
    return this.providerService.findShowSeasons(data);
  }

  async findSeasonEpisodes(
    data: FindSeasonEpisodesData,
  ): Promise<FindSeasonEpisodesResult> {
    return this.providerService.findSeasonEpisodes(data);
  }
}

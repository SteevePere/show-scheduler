import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { DataProviderEnum } from '@scheduler/shared';
import { DataProviderConfig } from 'src/config/data-provider.config';
import {
  FindShowsData,
  FindShowsResult,
} from 'src/modules/shows/dtos/find-shows.dto';
import { TvMazeService } from './providers/tv-maze/tv-maze.service';

@Injectable()
export class DataProviderService {
  constructor(
    @Inject(DataProviderConfig.KEY)
    private readonly dataProviderConfig: ConfigType<typeof DataProviderConfig>,
    private readonly tvMazeService: TvMazeService,
  ) {}

  async findShows(data: FindShowsData): Promise<FindShowsResult> {
    switch (this.dataProviderConfig.name) {
      case DataProviderEnum.TV_MAZE:
        return this.tvMazeService.findShows(data);
      default:
        return this.tvMazeService.findShows(data);
    }
  }
}

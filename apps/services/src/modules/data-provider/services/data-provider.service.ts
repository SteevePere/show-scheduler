import { Inject, Injectable } from '@nestjs/common';
import {
  FindShowsData,
  FindShowsResult,
} from 'src/modules/shows/dtos/find-shows.dto';
import { DataProviderAbstractService } from './abstract/data-provider.abstract-service';

@Injectable()
export class DataProviderService {
  constructor(
    @Inject('EXTERNAL_DATA_PROVIDER_SERVICE')
    private readonly service: DataProviderAbstractService,
  ) {}

  async findShows(data: FindShowsData): Promise<FindShowsResult> {
    return this.service.findShows(data);
  }
}

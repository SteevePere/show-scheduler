import { Controller, Get, Query } from '@nestjs/common';
import {
  FindShowRequest,
  FindShowResponse,
  SearchShowsRequest,
  SearchShowsResponse,
} from '@scheduler/shared';
import { Public } from 'src/core/decorators/public.decorator';
import { createFromClass } from 'src/core/utils/transformers.util';
import { FindShowData } from '../dtos/find-show.dto';
import { SearchShowsData } from '../dtos/search-shows.dto';
import { SchedulerService } from '../services/scheduler.service';
import { ShowsService } from '../services/shows.service';

@Controller('shows')
export class ShowsController {
  constructor(
    public showsService: ShowsService,
    private schedulerService: SchedulerService,
  ) {}

  @Public()
  @Get('external/search')
  async searchExternalShows(
    @Query() data: SearchShowsRequest,
  ): Promise<SearchShowsResponse> {
    return this.showsService.searchExternalShows(
      createFromClass(SearchShowsData, {
        ...data,
      }),
    );
  }

  @Public()
  @Get()
  async findShow(@Query() data: FindShowRequest): Promise<FindShowResponse> {
    return this.showsService.findShow(
      createFromClass(FindShowData, {
        ...data,
        ignoreNotFound: !!data.externalId,
      }),
    );
  }
}

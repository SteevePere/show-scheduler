import { Controller, Get, Query } from '@nestjs/common';
import { SearchShowsRequest, SearchShowsResponse } from '@scheduler/shared';
import { Public } from 'src/core/decorators/public.decorator';
import { createFromClass } from 'src/core/utils/transformers.util';
import { SearchShowsData } from '../dtos/search-shows.dto';
import { ShowsService } from '../services/shows.service';

@Controller('shows')
export class ShowsController {
  constructor(public showsService: ShowsService) {}

  @Public()
  @Get()
  async searchShows(
    @Query() data: SearchShowsRequest,
  ): Promise<SearchShowsResponse> {
    return this.showsService.searchShows(
      createFromClass(SearchShowsData, {
        ...data,
      }),
    );
  }
}

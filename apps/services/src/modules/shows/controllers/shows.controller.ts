import { Controller, Get, Query } from '@nestjs/common';
import { FindShowsRequest, FindShowsResponse } from '@scheduler/shared';
import { Public } from 'src/core/decorators/public.decorator';
import { createFromClass } from 'src/core/utils/transformers.util';
import { FindShowsData } from '../dtos/find-shows.dto';
import { ShowsService } from '../services/shows.service';

@Controller('shows')
export class ShowsController {
  constructor(public showsService: ShowsService) {}

  @Public()
  @Get()
  async findShows(@Query() data: FindShowsRequest): Promise<FindShowsResponse> {
    return this.showsService.findShows(
      createFromClass(FindShowsData, {
        ...data,
      }),
    );
  }
}

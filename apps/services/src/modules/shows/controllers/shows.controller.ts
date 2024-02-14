import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  FindShowRequest,
  FindShowResponse,
  SearchShowsRequest,
  SearchShowsResponse,
  UserObject,
} from '@scheduler/shared';
import { CurrentAuthenticatedUser } from 'src/core/decorators/authenticated-user.decorator';
import { Public } from 'src/core/decorators/public.decorator';
import { createFromClass } from 'src/core/utils/transformers.util';
import { FindShowData } from '../dtos/find-show.dto';
import { SearchShowsData } from '../dtos/search-shows.dto';
import { ShowsService } from '../services/shows.service';

@Controller('shows')
@ApiTags('Shows')
export class ShowsController {
  constructor(public showsService: ShowsService) {}

  @Get('external/search')
  @ApiOperation({ summary: 'Search among all available Shows' })
  @ApiOkResponse({
    type: SearchShowsResponse,
  })
  async searchExternalShows(
    @Query() data: SearchShowsRequest,
    @CurrentAuthenticatedUser() currentUser: UserObject,
  ): Promise<SearchShowsResponse> {
    return this.showsService.searchExternalShows(
      createFromClass(SearchShowsData, {
        ...data,
        currentUser,
      }),
    );
  }

  @Get()
  @ApiOperation({ summary: 'Find a particular Show' })
  @ApiOkResponse({
    type: FindShowResponse,
  })
  async findShow(
    @Query() data: FindShowRequest,
    @CurrentAuthenticatedUser() currentUser: UserObject,
  ): Promise<FindShowResponse> {
    return this.showsService.findShow(
      createFromClass(FindShowData, {
        ...data,
        ignoreNotFound: !!data.externalId,
        currentUser,
      }),
    );
  }
}

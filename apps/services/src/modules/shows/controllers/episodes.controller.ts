import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  EpisodeObject,
  FindEpisodesRequest,
  PaginatedResponse,
  ToggleEpisodeWatchedRequest,
  ToggleEpisodeWatchedResponse,
  UserObject,
} from '@scheduler/shared';
import { ApiPaginatedResponse } from 'src/core/decorators/api-paginated-response.decorator';
import { CurrentAuthenticatedUser } from 'src/core/decorators/authenticated-user.decorator';
import { createFromClass } from 'src/core/utils/transformers.util';
import { FindEpisodesData } from '../dtos/find-episodes.dto';
import { ToggleEpisodeWatchedData } from '../dtos/toggle-episode-watched.dto';
import { EpisodesService } from '../services/episodes.service';

@Controller('episodes')
@ApiTags('Episodes')
export class EpisodesController {
  constructor(public episodesService: EpisodesService) {}

  @Post('watched')
  @ApiOperation({ summary: 'Mark an Episode as watched or not' })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: ToggleEpisodeWatchedResponse,
    description: '',
  })
  async toggleEpisodeWatched(
    @CurrentAuthenticatedUser() currentUser: UserObject,
    @Body() data: ToggleEpisodeWatchedRequest,
  ): Promise<ToggleEpisodeWatchedResponse> {
    return this.episodesService.toggleEpisodeWatched(
      createFromClass(ToggleEpisodeWatchedData, {
        currentUser,
        ...data,
      }),
    );
  }

  @Get()
  @ApiOperation({ summary: 'Find Episodes based on criteria' })
  @ApiBearerAuth()
  @ApiPaginatedResponse(EpisodeObject)
  async findEpisodes(
    @CurrentAuthenticatedUser() currentUser: UserObject,
    @Query() data: FindEpisodesRequest,
  ): Promise<PaginatedResponse<EpisodeObject>> {
    const { limit = 20, skip = 0 } = data;
    const { episodes, count } = await this.episodesService.findEpisodes(
      createFromClass(FindEpisodesData, {
        currentUser,
        ...data,
      }),
    );

    return {
      items: episodes,
      count,
      limit,
      skip,
    };
  }
}

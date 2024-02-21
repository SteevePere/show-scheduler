import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  FindSeasonEpisodesRequest,
  FindSeasonEpisodesResponse,
  ToggleSeasonWatchedRequest,
  ToggleSeasonWatchedResponse,
  UserObject,
} from '@scheduler/shared';
import { CurrentAuthenticatedUser } from 'src/core/decorators/authenticated-user.decorator';
import { createFromClass } from 'src/core/utils/transformers.util';
import { FindSeasonEpisodesData } from '../dtos/find-season-episodes.dto';
import { ToggleSeasonWatchedData } from '../dtos/toggle-season-watched.dto';
import { SeasonsService } from '../services/seasons.service';

@Controller('seasons')
@ApiTags('Seasons')
export class SeasonsController {
  constructor(public seasonsService: SeasonsService) {}

  @Post('watched')
  @ApiOperation({ summary: 'Mark a Season as watched or not' })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: ToggleSeasonWatchedResponse,
  })
  async toggleSeasonWatched(
    @CurrentAuthenticatedUser() currentUser: UserObject,
    @Body() data: ToggleSeasonWatchedRequest,
  ): Promise<ToggleSeasonWatchedResponse> {
    return this.seasonsService.toggleSeasonWatched(
      createFromClass(ToggleSeasonWatchedData, {
        currentUser,
        ...data,
      }),
    );
  }

  @Get(':seasonExternalId/episodes')
  @ApiOperation({ summary: 'Find Episodes of a Season' })
  @ApiBearerAuth()
  @ApiOkResponse({
    type: FindSeasonEpisodesResponse,
  })
  async findSeasonEpisodes(
    @CurrentAuthenticatedUser() currentUser: UserObject,
    @Param() data: FindSeasonEpisodesRequest,
  ): Promise<FindSeasonEpisodesResponse> {
    return this.seasonsService.findSeasonEpisodes(
      createFromClass(FindSeasonEpisodesData, {
        currentUser,
        ...data,
      }),
    );
  }
}

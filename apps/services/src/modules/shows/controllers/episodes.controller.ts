import { Body, Controller, Post } from '@nestjs/common';
import {
  ToggleEpisodeWatchedRequest,
  ToggleEpisodeWatchedResponse,
  UserObject,
} from '@scheduler/shared';
import { CurrentAuthenticatedUser } from 'src/core/decorators/authenticated-user.decorator';
import { createFromClass } from 'src/core/utils/transformers.util';
import { ToggleEpisodeWatchedData } from '../dtos/toggle-episode-watched.dto';
import { EpisodesService } from '../services/episodes.service';

@Controller('episodes')
export class EpisodesController {
  constructor(public episodesService: EpisodesService) {}

  @Post('watched')
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
}

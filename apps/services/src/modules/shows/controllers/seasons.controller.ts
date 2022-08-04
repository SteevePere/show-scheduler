import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ToggleSeasonWatchedRequest,
  ToggleSeasonWatchedResponse,
  UserObject,
} from '@scheduler/shared';
import { CurrentAuthenticatedUser } from 'src/core/decorators/authenticated-user.decorator';
import { createFromClass } from 'src/core/utils/transformers.util';
import { ToggleSeasonWatchedData } from '../dtos/toggle-season-watched.dto';
import { SeasonsService } from '../services/seasons.service';

@Controller('seasons')
@ApiTags('Seasons')
export class SeasonsController {
  constructor(public seasonsService: SeasonsService) {}

  @Post('watched')
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
}

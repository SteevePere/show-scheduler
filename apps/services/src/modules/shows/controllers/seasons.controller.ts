import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
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
}

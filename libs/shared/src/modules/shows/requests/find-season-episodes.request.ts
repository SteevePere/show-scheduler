import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import {
  IsSafeInt
} from '../../../decorators/validation/is-safe-integer.decorator';

export class FindSeasonEpisodesRequest {
  @ApiProperty({
    description: 'External id of the parent Season',
    example: 1,
  })
  @IsNotEmpty()
  @IsSafeInt()
  seasonExternalId: number;
}
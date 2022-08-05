import { ApiProperty } from '@nestjs/swagger';

import { IsSafeInt } from '../../../decorators/validation/is-safe-integer.decorator';

export class BaseFavoriteRequest {
  @ApiProperty({
    description: 'External id of the Show',
    example: 1,
  })
  @IsSafeInt()
  showExternalId: number;
}
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import {
  IsSafeInt
} from '../../../decorators/validation/is-safe-integer.decorator';
import { FavoriteObject } from '../objects/favorite.object';

export class FindFavoritesResponse {
  @ApiProperty({
    description: 'User Favorites',
    type: [FavoriteObject],
  })
  @Type(() => FavoriteObject)
  @ValidateNested()
  data: FavoriteObject[];

  @ApiProperty({
    description: 'Total count of existing items',
    example: 1,
  })
  @IsSafeInt()
  count: number;

  @ApiProperty({
    description: 'Total count of existing items',
    example: 1,
  })
  @IsSafeInt()
  total: number;

  @ApiProperty({
    description: 'Current page',
    example: 1,
  })
  @IsSafeInt()
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 1,
  })
  @IsSafeInt()
  pageCount: number;
}
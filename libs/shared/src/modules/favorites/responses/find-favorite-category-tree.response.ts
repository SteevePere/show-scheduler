import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { FavoriteCategoryObject } from '../objects/favorite-category.object';

export class FindFavoriteCategoryTreeResponse {
  @ApiProperty({
    description: 'User Favorites Categories',
    type: [FavoriteCategoryObject],
  })
  @Type(() => FavoriteCategoryObject)
  @ValidateNested()
  categories: FavoriteCategoryObject[];
}
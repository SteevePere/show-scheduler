import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';

import { FavoriteCategoryObject } from '../objects/favorite-category.object';

export class UpdateFavoriteCategoryResponse {
  @ApiProperty({
    description: 'Category object targeted by the request',
  })
  @IsObject()
  @ValidateNested()
  @Type(() => FavoriteCategoryObject)
  category: FavoriteCategoryObject;
}
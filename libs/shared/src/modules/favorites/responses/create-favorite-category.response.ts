import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';

import { FavoriteCategoryObject } from '../objects/favorite-category.object';

export class CreateFavoriteCategoryResponse {
  @ApiProperty({
    description: 'Category that was just created',
  })
  @IsObject()
  @ValidateNested()
  @Type(() => FavoriteCategoryObject)
  category: FavoriteCategoryObject;
}
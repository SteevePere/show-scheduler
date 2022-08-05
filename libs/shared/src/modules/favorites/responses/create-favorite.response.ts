import { ApiProperty } from '@nestjs/swagger';
import { IsObject, ValidateNested } from 'class-validator';

import { ShowObject } from '../../shows/objects/show.object';

export class CreateFavoriteResponse {
  @ApiProperty({
    description: 'Show that was just added to favorites',
  })
  @IsObject()
  @ValidateNested()
  show: ShowObject;
}
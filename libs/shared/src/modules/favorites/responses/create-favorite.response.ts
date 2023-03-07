import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';

import { ShowObject } from '../../shows/objects/show.object';

export class CreateFavoriteResponse {
  @ApiProperty({
    description: 'Show that was just added to favorites',
  })
  @IsObject()
  @ValidateNested()
  @Type(() => ShowObject)
  show: ShowObject;
}
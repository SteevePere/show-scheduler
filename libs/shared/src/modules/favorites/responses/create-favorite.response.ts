import { IsObject, ValidateNested } from 'class-validator';

import { ShowObject } from '../../shows/objects/show.object';

export class CreateFavoriteResponse {
  @IsObject()
  @ValidateNested()
  show: ShowObject;
}
import { IsObject, ValidateNested } from 'class-validator';

import { ShowObject } from '../objects/show.object';

export class BaseShowResponse {
  @IsObject()
  @ValidateNested()
  show: ShowObject;
}
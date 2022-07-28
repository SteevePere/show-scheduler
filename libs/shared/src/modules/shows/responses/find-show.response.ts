import { IsObject, ValidateNested } from 'class-validator';

import { ShowObject } from '../objects/show.object';

export class FindShowResponse {
  @IsObject()
  @ValidateNested()
  show: ShowObject;
}
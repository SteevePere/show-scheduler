import { IsArray, ValidateNested } from 'class-validator';

import { ShowObject } from '../objects/show.object';

export class FindShowsResponse {
  @IsArray()
  @ValidateNested()
  shows: ShowObject[];
}
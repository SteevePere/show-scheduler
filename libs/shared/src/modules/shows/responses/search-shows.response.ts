import { IsArray, ValidateNested } from 'class-validator';

import { ShowObject } from '../objects/show.object';

export class SearchShowsResponse {
  @IsArray()
  @ValidateNested()
  shows: ShowObject[];
}
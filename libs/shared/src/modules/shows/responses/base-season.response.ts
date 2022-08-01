import { IsObject, ValidateNested } from 'class-validator';

import { SeasonObject } from '../objects/season.object';

export class BaseSeasonResponse {
  @IsObject()
  @ValidateNested()
  season: SeasonObject;
}
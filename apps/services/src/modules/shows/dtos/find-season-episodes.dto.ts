import {
  FindSeasonEpisodesRequest,
  FindSeasonEpisodesResponse,
  UserObject,
} from '@scheduler/shared';
import { SeasonEntity } from '../entities/season.entity';

export class FindSeasonEpisodesData extends FindSeasonEpisodesRequest {
  season?: SeasonEntity;
  currentUser?: UserObject;
}

export class FindSeasonEpisodesResult extends FindSeasonEpisodesResponse {}

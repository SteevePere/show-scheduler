import {
  FindShowsData,
  FindShowsResult,
} from 'src/modules/shows/dtos/find-shows.dto';

export abstract class ProviderAbstractService {
  abstract findShows(data: FindShowsData): Promise<FindShowsResult>;
}

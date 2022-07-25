import {
  FindShowsData,
  FindShowsResult,
} from 'src/modules/shows/dtos/find-shows.dto';

export abstract class DataProviderAbstractService {
  abstract findShows(data: FindShowsData): Promise<FindShowsResult>;
}

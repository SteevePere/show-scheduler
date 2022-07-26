import {
  FindShowData,
  FindShowResult,
} from 'src/modules/shows/dtos/find-show.dto';
import {
  SearchShowsData,
  SearchShowsResult,
} from 'src/modules/shows/dtos/search-shows.dto';

export abstract class DataProviderAbstractService {
  abstract searchShows(data: SearchShowsData): Promise<SearchShowsResult>;

  abstract findShow(data: FindShowData): Promise<FindShowResult>;
}

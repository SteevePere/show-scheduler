import {
  FindSeasonEpisodesData,
  FindSeasonEpisodesResult,
} from 'src/modules/shows/dtos/find-season-episodes.dto';
import {
  FindShowSeasonsData,
  FindShowSeasonsResult,
} from 'src/modules/shows/dtos/find-show-seasons.dto';
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

  abstract findShowSeasons(
    data: FindShowSeasonsData,
  ): Promise<FindShowSeasonsResult>;

  abstract findSeasonEpisodes(
    data: FindSeasonEpisodesData,
  ): Promise<FindSeasonEpisodesResult>;
}

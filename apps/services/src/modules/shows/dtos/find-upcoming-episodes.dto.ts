import { IUpcomingEpisode } from '../interfaces/upcoming-episode.interface';

export class FindUpcomingEpisodesData {
  period: string;
}

export class FindUpcomingEpisodesResult {
  upcomingEpisodes: IUpcomingEpisode[];
}

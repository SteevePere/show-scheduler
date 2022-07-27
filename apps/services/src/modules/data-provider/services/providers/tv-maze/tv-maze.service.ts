import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { EpisodeObject, SeasonObject, ShowObject } from '@scheduler/shared';
import axios, { AxiosInstance } from 'axios';
import { DataProviderConfig } from 'src/config/data-provider.config';
import { TvMazeEpisodeObject } from 'src/modules/data-provider/dtos/providers/tv-maze/episode.dto';
import { TvMazeSearchShowsObject } from 'src/modules/data-provider/dtos/providers/tv-maze/search-shows.dto';
import { TvMazeSeasonObject } from 'src/modules/data-provider/dtos/providers/tv-maze/season.dto';
import { TvMazeShowObject } from 'src/modules/data-provider/dtos/providers/tv-maze/show.dto';
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
import { DataProviderAbstractService } from '../../abstract/data-provider.abstract-service';

@Injectable()
export class TvMazeService implements DataProviderAbstractService {
  private axiosInstance: AxiosInstance;

  constructor(
    @Inject(DataProviderConfig.KEY)
    private readonly dataProviderConfig: ConfigType<typeof DataProviderConfig>,
  ) {
    this.axiosInstance = this.buildAxiosInstance();
  }

  private buildAxiosInstance(): AxiosInstance {
    return axios.create({
      baseURL: this.dataProviderConfig.providers.tvMaze.api.baseUrl,
    });
  }

  async searchShows(data: SearchShowsData): Promise<SearchShowsResult> {
    try {
      const shows = await this.axiosInstance
        .get<TvMazeSearchShowsObject[]>(`/search/shows`, {
          params: {
            q: data.query,
          },
        })
        .then((response) => response.data);

      return {
        shows: shows.map<ShowObject>((tvMazeShow) => {
          return {
            externalId: tvMazeShow.show.id,
            name: tvMazeShow.show.name,
            summary: tvMazeShow.show.summary || null,
            language: tvMazeShow.show.language,
            rating: tvMazeShow.show.rating.average,
            imageUrl: tvMazeShow.show.image.medium,
            genres: tvMazeShow.show.genres,
          };
        }),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error when trying to fetch Shows from Tv Maze',
        error,
      );
    }
  }

  async findShow(data: FindShowData): Promise<FindShowResult> {
    const { externalId } = data;

    try {
      const show = await this.axiosInstance
        .get<TvMazeShowObject>(`/shows/${externalId}`)
        .then((response) => response.data);

      return {
        show: {
          externalId: show.id,
          name: show.name,
          summary: show.summary || null,
          language: show.language,
          rating: show.rating.average,
          imageUrl: show.image.medium,
          genres: show.genres,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error when trying to fetch Show ${externalId} from Tv Maze`,
        error,
      );
    }
  }

  async findShowSeasons(
    data: FindShowSeasonsData,
  ): Promise<FindShowSeasonsResult> {
    const { showExternalId } = data;

    try {
      const seasons = await this.axiosInstance
        .get<TvMazeSeasonObject[]>(`/shows/${showExternalId}/seasons`)
        .then((response) => response.data);

      return {
        seasons: seasons.map<SeasonObject>((tvMazeSeason) => {
          return {
            externalId: tvMazeSeason.id,
            number: tvMazeSeason.number,
            name: tvMazeSeason.name || null,
            summary: tvMazeSeason.summary || null,
            imageUrl: tvMazeSeason.image.medium,
            premiereDate: tvMazeSeason.premiereDate || null,
            endDate: tvMazeSeason.endDate || null,
          };
        }),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error when trying to fetch seasons of Show ${showExternalId} from Tv Maze`,
        error,
      );
    }
  }

  async findSeasonEpisodes(
    data: FindSeasonEpisodesData,
  ): Promise<FindSeasonEpisodesResult> {
    const { seasonExternalId } = data;

    try {
      const episodes = await this.axiosInstance
        .get<TvMazeEpisodeObject[]>(`/seasons/${seasonExternalId}/episodes`)
        .then((response) => response.data);

      return {
        episodes: episodes.map<EpisodeObject>((tvMazeEpisode) => {
          return {
            externalId: tvMazeEpisode.id,
            number: tvMazeEpisode.number,
            name: tvMazeEpisode.name || null,
            summary: tvMazeEpisode.summary || null,
            imageUrl: tvMazeEpisode.image.medium,
            airDate: tvMazeEpisode.airstamp || null,
          };
        }),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error when trying to fetch episodes of Season ${seasonExternalId} from Tv Maze`,
        error,
      );
    }
  }
}

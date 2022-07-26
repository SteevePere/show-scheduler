import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ShowObject } from '@scheduler/shared';
import axios, { AxiosInstance } from 'axios';
import { DataProviderConfig } from 'src/config/data-provider.config';
import {
  TvMazeSearchShowObject,
  TvMazeShowObject,
} from 'src/modules/data-provider/dtos/providers/tv-maze/find-shows.dto';
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
        .get<TvMazeSearchShowObject[]>(`/search/shows`, {
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
        'Error trying to fetch Shows from Tv Maze',
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
        `Error trying to fetch Show ${externalId} from Tv Maze`,
        error,
      );
    }
  }
}

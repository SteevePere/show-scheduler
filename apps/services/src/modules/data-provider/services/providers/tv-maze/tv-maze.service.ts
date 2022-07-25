import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ShowObject } from '@scheduler/shared';
import axios, { AxiosInstance } from 'axios';
import { DataProviderConfig } from 'src/config/data-provider.config';
import { TvMazeShowObject } from 'src/modules/data-provider/dtos/providers/tv-maze/find-shows.dto';
import {
  FindShowsData,
  FindShowsResult,
} from 'src/modules/shows/dtos/find-shows.dto';
import { ProviderAbstractService } from '../provider.abstract-service';

@Injectable()
export class TvMazeService extends ProviderAbstractService {
  private axiosInstance: AxiosInstance;

  constructor(
    @Inject(DataProviderConfig.KEY)
    private readonly dataProviderConfig: ConfigType<typeof DataProviderConfig>,
  ) {
    super();
    this.axiosInstance = this.buildAxiosInstance();
  }

  private buildAxiosInstance(): AxiosInstance {
    return axios.create({
      baseURL: this.dataProviderConfig.providers.tvMaze.api.baseUrl,
    });
  }

  async findShows(data: FindShowsData): Promise<FindShowsResult> {
    try {
      const shows = await this.axiosInstance
        .get<TvMazeShowObject[]>(`/search/shows`, {
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
}

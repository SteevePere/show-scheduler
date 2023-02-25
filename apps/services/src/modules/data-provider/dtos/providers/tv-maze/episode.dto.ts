import { Type } from 'class-transformer';
import { Image, Links, Rating } from './shared.dto';

export class TvMazeEpisodeObject {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  type: string;
  airdate: Date;
  airtime: string;

  @Type(() => Date)
  airstamp: Date;

  runtime: number;
  rating: Rating;
  image: Image | null;
  summary: string;
  _links: Links;
}

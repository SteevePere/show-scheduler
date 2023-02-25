import { Type } from 'class-transformer';
import { Image, Links, Network } from './shared.dto';

export class TvMazeSeasonObject {
  id: number;
  url: string;
  number: number;
  name: string;
  episodeOrder: number;

  @Type(() => Date)
  premiereDate: Date;

  @Type(() => Date)
  endDate: Date;

  network: Network;
  webChannel?: any;
  image: Image | null;
  summary: string;
  _links: Links;
}

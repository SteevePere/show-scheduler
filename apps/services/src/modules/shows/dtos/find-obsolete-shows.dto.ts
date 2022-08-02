import { ShowEntity } from '../entities/show.entity';

export class FindObsoleteShowsData {
  obsoleteFrom: Date;
}

export class FindObsoleteShowsResult {
  obsoleteShows: ShowEntity[];
}

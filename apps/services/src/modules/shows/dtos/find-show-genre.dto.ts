import { GenreObject } from '@scheduler/shared';

export class FindShowGenreData {
  id?: string;
  name?: string;
  ignoreNotFound?: boolean;
}

export class FindShowGenreResult {
  genre: GenreObject;
}

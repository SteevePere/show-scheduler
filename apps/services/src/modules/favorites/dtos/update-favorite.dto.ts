import { FavoriteObject } from '@scheduler/shared';
import { DeepPartial } from 'typeorm';
import { UserFavoriteShowEntity } from '../entities/user-favorite-show.entity';

export class UpdateFavoriteData {
  id: string;
  data: DeepPartial<UserFavoriteShowEntity>;
}

export class UpdateFavoriteResult {
  favorite: FavoriteObject;
}

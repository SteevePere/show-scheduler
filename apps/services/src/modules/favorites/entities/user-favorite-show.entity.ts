import { BaseEntity } from 'src/core/entities/base.entity';
import { ShowEntity } from 'src/modules/shows/entities/show.entity';
import { Column, Entity, ManyToOne, RelationId, Unique } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { UserFavoriteCategoryEntity } from './user-favorite-category.entity';

@Entity('user_favorite_shows')
@Unique('UNIQUE_SHOW_USER', ['userId', 'showId'])
export class UserFavoriteShowEntity extends BaseEntity {
  @Column({ default: true })
  isNotificationEnabled: boolean;

  @Column({ type: 'uuid' })
  @RelationId((userShow: UserFavoriteShowEntity) => userShow.user)
  userId: string;

  @Column({ type: 'uuid' })
  @RelationId((userShow: UserFavoriteShowEntity) => userShow.show)
  showId: string;

  @Column({ type: 'uuid', nullable: true })
  @RelationId((userShow: UserFavoriteShowEntity) => userShow.category)
  categoryId: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => ShowEntity)
  show: ShowEntity;

  @ManyToOne(() => UserFavoriteCategoryEntity, { onDelete: 'SET NULL' })
  category: UserFavoriteCategoryEntity;
}

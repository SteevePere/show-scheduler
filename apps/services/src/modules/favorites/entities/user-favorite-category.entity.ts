import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { UserFavoriteShowEntity } from './user-favorite-show.entity';

@Entity('user_favorite_categories')
export class UserFavoriteCategoryEntity extends BaseEntity {
  @Column({ type: 'uuid' })
  @RelationId((userCategory: UserFavoriteCategoryEntity) => userCategory.user)
  userId: string;

  @Column({ type: 'uuid', nullable: true })
  @RelationId((userCategory: UserFavoriteCategoryEntity) => userCategory.parent)
  parentId: string;

  @Column()
  name: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => UserFavoriteCategoryEntity, { onDelete: 'CASCADE' })
  parent: UserFavoriteCategoryEntity;

  @OneToMany(
    () => UserFavoriteShowEntity,
    (userFavoriteShowEntity: UserFavoriteShowEntity) =>
      userFavoriteShowEntity.category,
  )
  favorites: UserFavoriteShowEntity[];
}

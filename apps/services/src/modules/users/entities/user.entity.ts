import { UserGenderEnum, UserRoleEnum } from '@scheduler/shared';
import { BaseEntity } from 'src/core/entities/base.entity';
import { UserFavoriteShowEntity } from 'src/modules/favorites/entities/user-favorite-show.entity';
import { EpisodeEntity } from 'src/modules/shows/entities/episode.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string;

  @Column({ type: 'timestamptz' })
  birthDate: Date;

  @Column({
    type: 'enum',
    enum: UserGenderEnum,
  })
  gender: UserGenderEnum;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role: UserRoleEnum;

  @Column({ nullable: true })
  resetPasswordToken: string;

  @OneToMany(
    () => UserFavoriteShowEntity,
    (userFavoriteShowEntity: UserFavoriteShowEntity) =>
      userFavoriteShowEntity.user,
  )
  favorites: UserFavoriteShowEntity[];

  @ManyToMany(
    () => EpisodeEntity,
    (episodeEntity: EpisodeEntity) => episodeEntity.watchedBy,
  )
  watchedEpisodes: EpisodeEntity[];
}

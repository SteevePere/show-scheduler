import { BaseEntity } from 'src/core/entities/base.entity';
import { UserFavoriteShowEntity } from 'src/modules/favorites/entities/user-favorite-show.entity';
import { FileEntity } from 'src/modules/files/entities/file.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  RelationId,
} from 'typeorm';
import { GenreEntity } from './genre.entity';
import { SeasonEntity } from './season.entity';

@Entity('shows')
export class ShowEntity extends BaseEntity {
  @Column({ type: 'int', unique: true })
  externalId: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @Column()
  language: string;

  @Column({ type: 'decimal', nullable: true })
  rating: number;

  @Column({ type: 'timestamptz', nullable: true })
  lastFavoritedAt: Date;

  @Column({ type: 'uuid', nullable: true })
  @RelationId((show: ShowEntity) => show.image)
  imageId: string;

  @OneToOne(() => FileEntity, {
    eager: true,
  })
  @JoinColumn({ name: 'imageId' })
  image: FileEntity;

  @ManyToMany(() => GenreEntity, {
    eager: true,
  })
  @JoinTable({
    name: 'show_genres',
    joinColumns: [{ name: 'showId' }],
    inverseJoinColumns: [{ name: 'genreId' }],
  })
  genres: GenreEntity[];

  @OneToMany(
    () => SeasonEntity,
    (seasonEntity: SeasonEntity) => seasonEntity.show,
  )
  seasons: SeasonEntity[];

  @OneToMany(
    () => UserFavoriteShowEntity,
    (userFavoriteShowEntity: UserFavoriteShowEntity) =>
      userFavoriteShowEntity.show,
  )
  userFavoriteReferences: UserFavoriteShowEntity[];
}

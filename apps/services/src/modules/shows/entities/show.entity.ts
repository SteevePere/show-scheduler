import { BaseEntity } from 'src/core/entities/base.entity';
import { FileEntity } from 'src/modules/files/entities/file.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { GenreEntity } from './genre.entity';

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

  @Column({ type: 'uuid' })
  @RelationId((show: ShowEntity) => show.image)
  imageId: string;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
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
}

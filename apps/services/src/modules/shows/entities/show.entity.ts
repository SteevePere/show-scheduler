import { BaseEntity } from 'src/core/entities/base.entity';
import { FileEntity } from 'src/modules/files/entities/file.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { GenreEntity } from './genre.entity';

@Entity('shows')
export class ShowEntity extends BaseEntity {
  @Column({ type: 'int' })
  externalId: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @Column()
  language: string;

  @Column({ type: 'decimal', nullable: true })
  rating: number;

  @ManyToOne(() => FileEntity)
  image: FileEntity;

  @ManyToMany(() => GenreEntity)
  @JoinTable({
    name: 'show_genres',
    joinColumns: [{ name: 'showId' }],
    inverseJoinColumns: [{ name: 'genreId' }],
  })
  genres: GenreEntity[];
}

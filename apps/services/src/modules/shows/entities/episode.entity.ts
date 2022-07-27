import { BaseEntity } from 'src/core/entities/base.entity';
import { FileEntity } from 'src/modules/files/entities/file.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { SeasonEntity } from './season.entity';

@Entity('episodes')
export class EpisodeEntity extends BaseEntity {
  @Column({ type: 'int', unique: true })
  externalId: number;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'int', default: 1 })
  number: number;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @Column({ type: 'timestamptz' })
  airDate: Date;

  @Column({ type: 'uuid' })
  @RelationId((episode: EpisodeEntity) => episode.season)
  seasonId: string;

  @ManyToOne(() => SeasonEntity)
  season: SeasonEntity;

  @Column({ type: 'uuid' })
  @RelationId((episode: EpisodeEntity) => episode.image)
  imageId: string;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  image: FileEntity;
}

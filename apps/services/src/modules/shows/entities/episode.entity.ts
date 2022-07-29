import { BaseEntity } from 'src/core/entities/base.entity';
import { FileEntity } from 'src/modules/files/entities/file.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  RelationId,
} from 'typeorm';
import { SeasonEntity } from './season.entity';

@Entity('episodes')
export class EpisodeEntity extends BaseEntity {
  @Column({ type: 'int', unique: true })
  externalId: number;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'int', nullable: true })
  number: number;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @Column({ type: 'timestamptz' })
  airDate: Date;

  @Column({ type: 'uuid' })
  @RelationId((episode: EpisodeEntity) => episode.season)
  seasonId: string;

  @ManyToOne(() => SeasonEntity, (season) => season.episodes, {
    onDelete: 'CASCADE',
  })
  season: SeasonEntity;

  @Column({ type: 'uuid' })
  @RelationId((episode: EpisodeEntity) => episode.image)
  imageId: string;

  @OneToOne(() => FileEntity, {
    eager: true,
  })
  @JoinColumn({ name: 'imageId' })
  image: FileEntity;
}

import { BaseEntity } from 'src/core/entities/base.entity';
import { FileEntity } from 'src/modules/files/entities/file.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { SeasonEntity } from './season.entity';

@Entity('episodes')
export class EpisodeEntity extends BaseEntity {
  @Column({ type: 'int' })
  externalId: number;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'int', default: 1 })
  number: number;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @Column({ type: 'timestamptz' })
  airDate: Date;

  @ManyToOne(() => SeasonEntity)
  season: SeasonEntity;

  @ManyToOne(() => FileEntity)
  image: FileEntity;
}

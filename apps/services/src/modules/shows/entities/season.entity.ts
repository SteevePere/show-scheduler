import { BaseEntity } from 'src/core/entities/base.entity';
import { FileEntity } from 'src/modules/files/entities/file.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ShowEntity } from './show.entity';

@Entity('seasons')
export class SeasonEntity extends BaseEntity {
  @Column({ type: 'int' })
  externalId: number;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'int', default: 1 })
  number: number;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @Column({ type: 'timestamptz', nullable: true })
  premiereDate: Date;

  @Column({ type: 'timestamptz', nullable: true })
  endDate: Date;

  @ManyToOne(() => ShowEntity)
  show: ShowEntity;

  @ManyToOne(() => FileEntity)
  image: FileEntity;
}

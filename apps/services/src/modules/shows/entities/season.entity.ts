import { BaseEntity } from 'src/core/entities/base.entity';
import { FileEntity } from 'src/modules/files/entities/file.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { ShowEntity } from './show.entity';

@Entity('seasons')
export class SeasonEntity extends BaseEntity {
  @Column({ type: 'int', unique: true })
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

  @Column({ type: 'uuid' })
  @RelationId((season: SeasonEntity) => season.show)
  showId: string;

  @ManyToOne(() => ShowEntity)
  show: ShowEntity;

  @Column({ type: 'uuid' })
  @RelationId((season: SeasonEntity) => season.image)
  imageId: string;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  image: FileEntity;
}

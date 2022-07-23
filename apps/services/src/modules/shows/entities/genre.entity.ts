import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('genres')
export class GenreEntity extends BaseEntity {
  @Column()
  name: string;
}

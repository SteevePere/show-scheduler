import { FileSourceTypeEnum } from '@scheduler/shared';
import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('files')
export class FileEntity extends BaseEntity {
  @Column({ type: 'int' })
  externalId: number;

  @Column()
  filePath: string;

  @Column({
    type: 'enum',
    enum: FileSourceTypeEnum,
  })
  sourceType: FileSourceTypeEnum;
}

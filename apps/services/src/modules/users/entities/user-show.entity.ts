import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { ShowEntity } from 'src/modules/shows/entities/show.entity';

@Entity('user_shows')
export class UserShowEntity extends BaseEntity {
  @Column({ default: true })
  isNotificationEnabled: boolean;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => ShowEntity)
  show: ShowEntity;
}

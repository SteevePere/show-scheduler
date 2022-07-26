import { BaseEntity } from 'src/core/entities/base.entity';
import { ShowEntity } from 'src/modules/shows/entities/show.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('user_shows')
export class UserShowEntity extends BaseEntity {
  @Column({ default: true })
  isNotificationEnabled: boolean;

  @Column({ type: 'uuid' })
  @RelationId((userShow: UserShowEntity) => userShow.user)
  userId: string;

  @Column({ type: 'uuid' })
  @RelationId((userShow: UserShowEntity) => userShow.show)
  showId: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => ShowEntity)
  show: ShowEntity;
}

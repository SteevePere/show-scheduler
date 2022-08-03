import { UserGenderEnum, UserRoleEnum } from '@scheduler/shared';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from 'src/core/entities/base.entity';
import { EpisodeEntity } from 'src/modules/shows/entities/episode.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
} from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string;

  @Column({ type: 'timestamptz' })
  birthDate: Date;

  @Column({
    type: 'enum',
    enum: UserGenderEnum,
  })
  gender: UserGenderEnum;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role: UserRoleEnum;

  @Column({ nullable: true })
  resetPasswordToken: string;

  @ManyToMany(
    () => EpisodeEntity,
    (episodeEntity: EpisodeEntity) => episodeEntity.watchedBy,
  )
  watchedEpisodes: EpisodeEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPasswordHook() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}

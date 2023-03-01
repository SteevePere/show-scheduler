import { UpdateUserResponse } from '@scheduler/shared';
import { DeepPartial } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export class UpdateUserData {
  id: string;
  data: DeepPartial<UserEntity>;
}

export class UpdateUserResult extends UpdateUserResponse {}

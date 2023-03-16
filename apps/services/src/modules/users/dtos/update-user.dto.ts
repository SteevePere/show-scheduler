import { UpdateUserRequest, UpdateUserResponse } from '@scheduler/shared';
import { DeepPartial } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

type UserData = UpdateUserRequest & DeepPartial<UserEntity>;

export class UpdateUserData {
  id: string;
  data: UserData;
}

export class UpdateUserResult extends UpdateUserResponse {}

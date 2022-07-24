import { UserObject } from '@scheduler/shared';
import { DeepPartial } from 'typeorm';

export class UpdateUserData {
  id: string;
  data: DeepPartial<UserObject>;
}

export class UpdateUserResult {
  user: UserObject;
}

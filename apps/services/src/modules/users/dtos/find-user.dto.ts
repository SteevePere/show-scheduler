import { UserObject } from '@scheduler/shared';

export class FindUserData {
  id?: string;
  email?: string;
  includePassword?: boolean;
}

export class FindUserResult {
  user: UserObject;
}

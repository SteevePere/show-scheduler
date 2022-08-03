import { UserObject } from '@scheduler/shared';

export class FindUserData {
  id?: string;
  email?: string;
  includePassword?: boolean;
  includeResetPasswordToken?: boolean;
  relations?: string[];
}

export class FindUserResult {
  user: UserObject;
}

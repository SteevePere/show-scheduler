import { UserRoleEnum } from '@scheduler/shared';

export interface IDecodedToken {
  userId: string;
  role: UserRoleEnum;
}

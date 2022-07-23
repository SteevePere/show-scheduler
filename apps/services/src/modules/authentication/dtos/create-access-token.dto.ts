import { UserObject } from '@scheduler/shared';

export class CreateAccessTokenData {
  user: UserObject;
}

export class CreateAccessTokenResult {
  accessToken: string;
}

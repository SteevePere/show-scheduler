import { UserObject } from '@scheduler/shared';
import { IDecodedToken } from 'src/core/interfaces/decoded-token.interface';

export class ValidateTokenData {
  tokenData: IDecodedToken;
}

export class ValidateTokenResult {
  user: UserObject;
}

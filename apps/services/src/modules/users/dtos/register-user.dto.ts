import { UserObject } from '@scheduler/shared';
import { RegistrationData } from 'src/modules/authentication/dtos/register.dto';

export class RegisterUserData extends RegistrationData {}

export class RegisterUserResult {
  user: UserObject;
}

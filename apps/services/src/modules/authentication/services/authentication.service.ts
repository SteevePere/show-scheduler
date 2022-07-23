import { Inject, Injectable } from '@nestjs/common';
import { UserRoleEnum } from '@scheduler/shared';
import * as jwt from 'jsonwebtoken';
import { ConfigType } from '@nestjs/config';
import { AuthenticationConfig } from 'src/config/authentication.config';
import {
  CreateAccessTokenData,
  CreateAccessTokenResult,
} from '../dtos/create-access-token.dto';
import { RegistrationData, RegistrationResult } from '../dtos/register.dto';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(AuthenticationConfig.KEY)
    private readonly authenticationConfig: ConfigType<
      typeof AuthenticationConfig
    >,
    private readonly usersService: UsersService,
  ) {}

  async register(data: RegistrationData): Promise<RegistrationResult> {
    const { user } = await this.usersService.registerUser(data);

    return {
      user,
      tokens: this.createAccessToken({ user }),
    };
  }

  private createAccessToken(
    data: CreateAccessTokenData,
  ): CreateAccessTokenResult {
    const { user } = data;
    const jwtData = {
      role: UserRoleEnum.USER,
      userId: user.id,
    };

    const accessToken = jwt.sign(
      jwtData,
      this.authenticationConfig.jwt.accessToken.secret,
      {
        expiresIn: this.authenticationConfig.jwt.accessToken.expiration,
      },
    );

    return { accessToken };
  }
}

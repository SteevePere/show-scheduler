import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRoleEnum } from '@scheduler/shared';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigType } from '@nestjs/config';
import { AuthenticationConfig } from 'src/config/authentication.config';
import {
  CreateAccessTokenData,
  CreateAccessTokenResult,
} from '../dtos/create-access-token.dto';
import { RegistrationData, RegistrationResult } from '../dtos/register.dto';
import { UsersService } from 'src/modules/users/services/users.service';
import {
  ValidateTokenData,
  ValidateTokenResult,
} from '../dtos/validate-token.dto';
import { SignInData } from '../dtos/sign-in.dto';

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

  async signIn(data: SignInData) {
    const { email, password } = data;

    const { user } = await this.usersService.findUser({
      email,
      includePassword: true,
    });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      user,
      tokens: this.createAccessToken({ user }),
    };
  }

  async validateToken(data: ValidateTokenData): Promise<ValidateTokenResult> {
    const {
      tokenData: { userId: id },
    } = data;

    try {
      const user = await this.usersService.findUser({
        id,
      });
      return { user };
    } catch (error) {
      throw new UnauthorizedException(`User could not be found from token`);
    }
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
        expiresIn: this.authenticationConfig.jwt.accessToken.expiresIn,
      },
    );

    return { accessToken };
  }
}

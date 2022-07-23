import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';

import { AuthenticationConfig } from 'src/config/authentication.config';
import { AuthenticationService } from 'src/modules/authentication/services/authentication.service';
import { IDecodedToken } from '../interfaces/decoded-token.interface';

@Injectable()
export class JwtAuthenticationGuard extends AuthGuard('jwt') {
  constructor(
    @Inject(AuthenticationConfig.KEY)
    private readonly authenticationConfig: ConfigType<
      typeof AuthenticationConfig
    >,
    private readonly reflector: Reflector,
    private readonly authenticationService: AuthenticationService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const noAuth: boolean =
      this.reflector.get('no-auth', context.getHandler()) || false;
    if (noAuth) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const accessToken = request.cookies['Authentication'];

    if (!accessToken) {
      throw new UnauthorizedException('Missing accessToken');
    }

    const tokenData = jwt.verify(
      accessToken,
      this.authenticationConfig.jwt.accessToken.secret,
    ) as IDecodedToken;

    if (!tokenData) {
      throw new UnauthorizedException(`Invalid or expired access token`);
    }

    try {
      const user = await this.authenticationService.validateToken({
        tokenData,
      });
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException(`Invalid accessToken`);
    }
  }
}

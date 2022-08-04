import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  ForgotPasswordRequest,
  RegistrationRequest,
  RegistrationResponse,
  ResetPasswordRequest,
  SignInRequest,
  SignInResponse,
} from '@scheduler/shared';

import { Public } from 'src/core/decorators/public.decorator';
import { setCookie } from 'src/core/utils/cookies.util';

import { AuthenticationService } from '../services/authentication.service';
import { RegistrationData } from '../dtos/register.dto';
import { createFromClass } from 'src/core/utils/transformers.util';
import { ConfigType } from '@nestjs/config';
import { AuthenticationConfig } from 'src/config/authentication.config';
import { SignInData } from '../dtos/sign-in.dto';
import { ForgotPasswordData } from '../dtos/forgot-password.dto';
import { ResetPasswordData } from '../dtos/reset-password.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('authentication')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(
    @Inject(AuthenticationConfig.KEY)
    private readonly authenticationConfig: ConfigType<
      typeof AuthenticationConfig
    >,
    public authenticationService: AuthenticationService,
  ) {}

  @Public()
  @Post('register')
  async register(
    @Body() data: RegistrationRequest,
    @Res({ passthrough: true }) response: Response,
  ): Promise<RegistrationResponse> {
    const registerResult = await this.authenticationService.register(
      createFromClass(RegistrationData, {
        ...data,
      }),
    );

    setCookie({
      response,
      cookieName: 'Authentication',
      cookieValue: registerResult.tokens.accessToken,
      expiresIn: this.authenticationConfig.jwt.accessToken.expiresIn,
    });

    return createFromClass(RegistrationResponse, { ...registerResult });
  }

  @Public()
  @Post('sign-in')
  async signIn(
    @Body() data: SignInRequest,
    @Res({ passthrough: true }) response: Response,
  ): Promise<SignInResponse> {
    const authenticationResult = await this.authenticationService.signIn(
      createFromClass(SignInData, {
        ...data,
      }),
    );

    setCookie({
      response,
      cookieName: 'Authentication',
      cookieValue: authenticationResult.tokens.accessToken,
      expiresIn: this.authenticationConfig.jwt.accessToken.expiresIn,
    });

    return createFromClass(RegistrationResponse, { ...authenticationResult });
  }

  @Post('sign-out')
  async signOut(@Res({ passthrough: true }) response: Response): Promise<void> {
    setCookie({
      response,
      cookieName: 'Authentication',
      cookieValue: '',
      expiresIn: 0,
    });
  }

  @Public()
  @Post('forgot-password')
  async handleForgotPassword(
    @Body() data: ForgotPasswordRequest,
  ): Promise<void> {
    await this.authenticationService.handleForgotPassword(
      createFromClass(ForgotPasswordData, {
        ...data,
      }),
    );
  }

  @Public()
  @Post('reset-password')
  async resetPassword(@Body() data: ResetPasswordRequest): Promise<void> {
    await this.authenticationService.resetPassword(
      createFromClass(ResetPasswordData, {
        ...data,
      }),
    );
  }
}

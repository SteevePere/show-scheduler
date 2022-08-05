import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import {
  ForgotPasswordRequest,
  RegistrationRequest,
  RegistrationResponse,
  ResetPasswordRequest,
  SignInRequest,
  SignInResponse,
} from '@scheduler/shared';
import { Response } from 'express';

import { Public } from 'src/core/decorators/public.decorator';
import { setCookie } from 'src/core/utils/cookies.util';

import { ConfigType } from '@nestjs/config';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticationConfig } from 'src/config/authentication.config';
import { createFromClass } from 'src/core/utils/transformers.util';
import { ForgotPasswordData } from '../dtos/forgot-password.dto';
import { RegistrationData } from '../dtos/register.dto';
import { ResetPasswordData } from '../dtos/reset-password.dto';
import { SignInData } from '../dtos/sign-in.dto';
import { AuthenticationService } from '../services/authentication.service';

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
  @ApiOperation({ summary: 'Register and authenticate a User' })
  @ApiCreatedResponse({
    type: RegistrationResponse,
    description: 'Also sets Authentication cookie',
  })
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
  @ApiOperation({ summary: 'Authenticate a User' })
  @ApiCreatedResponse({
    type: SignInResponse,
    description: 'Also sets Authentication cookie',
  })
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
  @ApiOperation({ summary: 'Sign out the authenticated User' })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Also removes the Authentication cookie',
  })
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
  @ApiOperation({ summary: 'Get a link to reset User password' })
  @ApiCreatedResponse({
    description:
      'Sends an email to the provided email address, with a link that contains a reset token',
  })
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
  @ApiOperation({ summary: 'Change the password a User' })
  @ApiCreatedResponse({
    description: 'Also sends a confirmation email',
  })
  async resetPassword(@Body() data: ResetPasswordRequest): Promise<void> {
    await this.authenticationService.resetPassword(
      createFromClass(ResetPasswordData, {
        ...data,
      }),
    );
  }
}

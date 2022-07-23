import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Response } from 'express';
import { RegistrationRequest, RegistrationResponse } from '@scheduler/shared';

import { AuthenticationConfig } from 'src/config/authentication.config';
import { Public } from 'src/core/decorators/public.decorator';
import { setCookies } from 'src/core/utils/cookies.util';

import { AuthenticationService } from '../services/authentication.service';
import { RegistrationData } from '../dtos/register.dto';
import { createFromClass } from 'src/core/utils/transformers.util';

@Controller('authentication')
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
    const registerUserResult = await this.authenticationService.register(
      createFromClass(RegistrationData, {
        ...data,
      }),
    );

    setCookies(response, '', 0);

    return registerUserResult;
  }
}

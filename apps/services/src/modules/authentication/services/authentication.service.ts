import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
import { ForgotPasswordData } from '../dtos/forgot-password.dto';
import { nanoid } from 'nanoid';
import { EmailsService } from 'src/modules/emails/services/emails.service';
import { ResetPasswordData } from '../dtos/reset-password.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(AuthenticationConfig.KEY)
    private readonly authenticationConfig: ConfigType<
      typeof AuthenticationConfig
    >,
    private readonly usersService: UsersService,
    private readonly emailsService: EmailsService,
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
      const { user } = await this.usersService.findUser({
        id,
      });
      return { user };
    } catch (error) {
      throw new UnauthorizedException(`User could not be found from token`);
    }
  }

  async handleForgotPassword(data: ForgotPasswordData): Promise<void> {
    const { user } = await this.usersService.findUser({
      email: data.email,
    });

    const resetToken = nanoid();
    const hashedResetToken = await bcrypt.hash(resetToken, 10);

    await this.usersService.updateUser({
      id: user.id,
      data: {
        resetPasswordToken: hashedResetToken,
      },
    });

    await this.emailsService.sendTemplatedEmail({
      template: 'forgot-password',
      to: user.email,
      subject: 'Reset Your Password',
      data: {
        firstName: user.firstName,
        linkToApp: `${
          this.authenticationConfig.password.emails.urls.forgotPassword
        }?token=${encodeURI(resetToken)}`,
      },
    });
  }

  async resetPassword(resetPasswordData: ResetPasswordData): Promise<void> {
    const { email, password, token } = resetPasswordData;
    const { user } = await this.usersService.findUser({
      email,
      includeResetPasswordToken: true,
    });
    if (!user.resetPasswordToken) {
      throw new BadRequestException('No reset request for this user');
    }

    const isValidToken = await bcrypt.compare(token, user.resetPasswordToken);
    if (!isValidToken) {
      throw new UnauthorizedException('Invalid reset token provided');
    }

    await this.usersService.updateUser({
      id: user.id,
      data: {
        password,
        resetPasswordToken: null,
      },
    });

    await this.emailsService.sendTemplatedEmail({
      template: 'reset-password',
      to: email,
      subject: 'Password Updated',
      data: {
        firstName: user.firstName,
      },
    });
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

import { registerAs } from '@nestjs/config';

export const AuthenticationConfig = registerAs('authentication', () => ({
  jwt: {
    accessToken: {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: +process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    },
  },
  password: {
    emails: {
      urls: {
        forgotPassword: `${process.env.APP_BASE_URL}/${process.env.APP_FORGOT_PASSWORD_PATH}`,
      },
    },
  },
}));

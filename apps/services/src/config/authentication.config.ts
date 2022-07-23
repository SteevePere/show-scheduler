import { registerAs } from '@nestjs/config';

export const AuthenticationConfig = registerAs('authentication', () => ({
  jwt: {
    accessToken: {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: +process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    },
  },
}));

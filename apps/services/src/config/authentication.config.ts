import { registerAs } from '@nestjs/config';

export const AuthenticationConfig = registerAs('authentication', () => ({
  jwt: {
    accessToken: {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiration: +process.env.JWT_ACCESS_TOKEN_EXPIRATION,
    },
  },
}));

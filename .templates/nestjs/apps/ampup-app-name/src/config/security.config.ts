import { registerAs } from '@nestjs/config';

export const SecurityConfig = registerAs('security', () => ({
  jwtSecret: process.env.JWT_SECRET,
  cors: process.env.CORS && process.env.CORS.split(','),
  rateLimit: process.env.RATE_LIMIT,
  proxy: process.env.PROXY,
}));

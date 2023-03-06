import { registerAs } from '@nestjs/config';

export const SentryConfig = registerAs('sentry', () => ({
  dsn: process.env.SENTRY_DSN,
}));

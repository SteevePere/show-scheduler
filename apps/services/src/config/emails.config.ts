import { registerAs } from '@nestjs/config';

export const EmailsConfig = registerAs('emails', () => ({
  from: process.env.EMAILS_FROM,
  host: process.env.EMAILS_HOST,
  port: +process.env.EMAILS_PORT,
  secure: process.env.EMAILS_SECURE,
  authentication: {
    user: process.env.EMAILS_USER,
    password: process.env.EMAILS_PASSWORD,
  },
}));

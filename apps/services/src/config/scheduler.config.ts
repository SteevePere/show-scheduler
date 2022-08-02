import { registerAs } from '@nestjs/config';

export const SchedulerConfig = registerAs('scheduler', () => ({
  favorites: {
    cleanUp: {
      obsoleteFrom: {
        weeks: +process.env.FAVORITE_OBSOLETE_FROM_WEEKS,
      },
      cronJob: {
        interval: process.env.FAVORITE_CLEANUP_JOB_INTERVAL,
      },
    },
  },
  notifications: {
    cronJob: {
      interval: process.env.NOTIFICATIONS_JOB_INTERVAL,
    },
    noticePeriod: process.env.NOTIFICATIONS_NOTICE_PERIOD,
  },
}));

import { registerAs } from '@nestjs/config';

export const SchedulerConfig = registerAs('scheduler', () => ({
  favorites: {
    cleanUp: {
      obsoleteFrom: {
        weeks: +process.env.FAVORITE_OBSOLETE_FROM_WEEKS,
      },
    },
  },
}));

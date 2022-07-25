import { registerAs } from '@nestjs/config';

export const DataProviderConfig = registerAs('data-provider', () => ({
  name: process.env.DATA_PROVIDER_NAME,
  providers: {
    tvMaze: {
      api: {
        baseUrl: process.env.TV_MAZE_BASE_URL,
      },
    },
  },
}));

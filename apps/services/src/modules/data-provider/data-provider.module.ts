import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { DataProviderEnum } from '@scheduler/shared';
import { DataProviderConfig } from 'src/config/data-provider.config';
import { DataProviderAbstractService } from './services/abstract/data-provider.abstract-service';
import { DataProviderService } from './services/data-provider.service';
import { TvMazeService } from './services/providers/tv-maze/tv-maze.service';

const providerNameToClass = {
  [DataProviderEnum.TV_MAZE]: TvMazeService,
};

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [DataProviderConfig],
      envFilePath: ['.env'],
    }),
  ],
  providers: [
    DataProviderService,
    {
      provide: 'EXTERNAL_DATA_PROVIDER_SERVICE',
      useFactory(
        config: ConfigType<typeof DataProviderConfig>,
      ): DataProviderAbstractService {
        return new providerNameToClass[process.env.DATA_PROVIDER_NAME](config);
      },
      inject: [DataProviderConfig.KEY],
    },
  ],
  exports: [DataProviderService],
  controllers: [],
})
export class DataProviderModule {}

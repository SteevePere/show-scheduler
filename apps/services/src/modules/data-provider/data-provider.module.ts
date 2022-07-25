import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataProviderConfig } from 'src/config/data-provider.config';
import { DataProviderService } from './services/data-provider.service';
import { TvMazeService } from './services/providers/tv-maze/tv-maze.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [DataProviderConfig],
      envFilePath: ['.env'],
    }),
  ],
  providers: [DataProviderService, TvMazeService],
  exports: [DataProviderService],
  controllers: [],
})
export class DataProviderModule {}

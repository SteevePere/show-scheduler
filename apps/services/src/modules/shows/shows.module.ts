import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataProviderModule } from '../data-provider/data-provider.module';
import { FilesModule } from '../files/files.module';
import { ShowsController } from './controllers/shows.controller';
import { EpisodeEntity } from './entities/episode.entity';
import { GenreEntity } from './entities/genre.entity';
import { SeasonEntity } from './entities/season.entity';
import { ShowEntity } from './entities/show.entity';
import { EpisodesService } from './services/episodes.service';
import { SchedulerService } from './services/scheduler.service';
import { SeasonsService } from './services/seasons.service';
import { ShowsService } from './services/shows.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      GenreEntity,
      ShowEntity,
      SeasonEntity,
      EpisodeEntity,
    ]),
    DataProviderModule,
    FilesModule,
  ],
  providers: [ShowsService, SeasonsService, EpisodesService, SchedulerService],
  exports: [ShowsService],
  controllers: [ShowsController],
})
export class ShowsModule {}

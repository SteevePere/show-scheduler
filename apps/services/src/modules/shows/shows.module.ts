import { Global, Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulerConfig } from 'src/config/scheduler.config';
import { DataProviderModule } from '../data-provider/data-provider.module';
import { EmailsModule } from '../emails/emails.module';
import { FilesModule } from '../files/files.module';
import { EpisodesController } from './controllers/episodes.controller';
import { SeasonsController } from './controllers/seasons.controller';
import { ShowsController } from './controllers/shows.controller';
import { EpisodeEntity } from './entities/episode.entity';
import { GenreEntity } from './entities/genre.entity';
import { SeasonEntity } from './entities/season.entity';
import { ShowEntity } from './entities/show.entity';
import { EpisodesService } from './services/episodes.service';
import { SchedulerService } from './services/scheduler.service';
import { SeasonsService } from './services/seasons.service';
import { ShowsService } from './services/shows.service';
import { FavoritesModule } from '../favorites/favorites.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [SchedulerConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forFeature([
      GenreEntity,
      ShowEntity,
      SeasonEntity,
      EpisodeEntity,
    ]),
    DataProviderModule,
    FilesModule,
    EmailsModule,
    forwardRef(() => FavoritesModule),
  ],
  providers: [ShowsService, SeasonsService, EpisodesService, SchedulerService],
  exports: [ShowsService],
  controllers: [ShowsController, SeasonsController, EpisodesController],
})
export class ShowsModule {}

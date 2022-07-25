import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataProviderModule } from '../data-provider/data-provider.module';
import { ShowsController } from './controllers/shows.controller';
import { EpisodeEntity } from './entities/episode.entity';
import { GenreEntity } from './entities/genre.entity';
import { SeasonEntity } from './entities/season.entity';
import { ShowEntity } from './entities/show.entity';
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
  ],
  providers: [ShowsService],
  exports: [],
  controllers: [ShowsController],
})
export class ShowsModule {}

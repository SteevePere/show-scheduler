import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodeEntity } from './entities/episode.entity';
import { GenreEntity } from './entities/genre.entity';
import { SeasonEntity } from './entities/season.entity';
import { ShowEntity } from './entities/show.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      GenreEntity,
      ShowEntity,
      SeasonEntity,
      EpisodeEntity,
    ]),
  ],
  providers: [],
  exports: [],
  controllers: [],
})
export class ShowsModule {}

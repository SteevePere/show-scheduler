import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreEntity } from '../shows/entities/genre.entity';
import { ShowEntity } from '../shows/entities/show.entity';
import { ShowsService } from '../shows/services/shows.service';
import { FavoritesController } from './controllers/favorites.controller';
import { UserShowEntity } from './entities/user-show.entity';
import { FavoritesService } from './services/favorites.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserShowEntity, ShowEntity, GenreEntity]),
  ],
  providers: [FavoritesService, ShowsService],
  exports: [],
  controllers: [FavoritesController],
})
export class FavoritesModule {}

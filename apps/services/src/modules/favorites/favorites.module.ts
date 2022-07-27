import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowsModule } from '../shows/shows.module';
import { FavoritesController } from './controllers/favorites.controller';
import { UserFavoriteShowEntity } from './entities/user-show.entity';
import { FavoritesService } from './services/favorites.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserFavoriteShowEntity]), ShowsModule],
  providers: [FavoritesService],
  exports: [],
  controllers: [FavoritesController],
})
export class FavoritesModule {}

import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowsModule } from '../shows/shows.module';
import { FavoriteCategoriesController } from './controllers/favorite-categories.controller';
import { FavoritesController } from './controllers/favorites.controller';
import { UserFavoriteCategoryEntity } from './entities/user-favorite-category.entity';
import { UserFavoriteShowEntity } from './entities/user-favorite-show.entity';
import { FavoriteCategoriesService } from './services/favorite.categories.service';
import { FavoritesService } from './services/favorites.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserFavoriteShowEntity,
      UserFavoriteCategoryEntity,
    ]),
    ShowsModule,
  ],
  providers: [FavoritesService, FavoriteCategoriesService],
  exports: [],
  controllers: [FavoritesController, FavoriteCategoriesController],
})
export class FavoritesModule {}

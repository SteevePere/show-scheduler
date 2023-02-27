import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FavoriteCategoriesService } from '../services/favorite.categories.service';

@Controller('favorites/categories')
@ApiTags('Categories of Favorites')
export class FavoriteCategoriesController {
  constructor(public favoriteCategoriesService: FavoriteCategoriesService) {}
}

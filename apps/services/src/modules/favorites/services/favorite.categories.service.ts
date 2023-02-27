import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserFavoriteCategoryEntity } from '../entities/user-favorite-category.entity';

@Injectable()
export class FavoriteCategoriesService {
  constructor(
    @InjectRepository(UserFavoriteCategoryEntity)
    private readonly episodesRepository: Repository<UserFavoriteCategoryEntity>,
  ) {}
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShowsService } from 'src/modules/shows/services/shows.service';
import { Repository } from 'typeorm';
import {
  CreateFavoriteData,
  CreateFavoriteResult,
} from '../dtos/create-favorite.dto';
import { UserShowEntity } from '../entities/user-show.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(UserShowEntity)
    private readonly userShowsRepository: Repository<UserShowEntity>,
    private readonly showsService: ShowsService,
  ) {}

  async createFavorite(
    data: CreateFavoriteData,
  ): Promise<CreateFavoriteResult> {
    const { currentUser, showExternalId, isNotificationEnabled } = data;

    const { show } = await this.showsService.findShow({
      externalId: showExternalId,
    });

    const favorite = this.userShowsRepository.create({
      userId: currentUser.id,
      showId: 'oto',
      isNotificationEnabled,
    });
    await this.userShowsRepository.save(favorite);

    return { show };
  }
}

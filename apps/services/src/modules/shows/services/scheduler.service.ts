import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DateTime } from 'luxon';
import { Connection } from 'typeorm';
import { ShowEntity } from '../entities/show.entity';

@Injectable()
export class SchedulerService {
  constructor(private readonly databaseConnection: Connection) {}

  @Cron(CronExpression.EVERY_WEEK)
  async removeObsoleteShows() {
    const aMonthAgo = DateTime.local().minus({ months: 1 }).toJSDate();

    const obsoleteShows = await this.databaseConnection
      .createQueryBuilder()
      .from(ShowEntity, 'show')
      .select('show')
      .leftJoinAndSelect('show.userFavoriteReferences', 'favorite')
      .where('favorite.id IS NULL')
      .andWhere('show.lastFavoritedAt < :aMonthAgo', { aMonthAgo })
      .getMany();

    await this.databaseConnection
      .getRepository(ShowEntity)
      .remove(obsoleteShows);

    // TODO: cascade to files
    await this.databaseConnection.query(
      `DELETE
        FROM files
        LEFT JOIN shows ON shows.imageId = files.id
        LEFT JOIN seasons ON seasons.imageId = files.id
        LEFT JOIN episodes ON episodes.imageId = files.id
        WHERE shows.id IS NULL OR seasons.id IS NULL OR episodes.id IS NULL;`,
      [],
    );
  }
}

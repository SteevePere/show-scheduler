import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DateTime } from 'luxon';
import { SchedulerConfig } from 'src/config/scheduler.config';
import { Connection } from 'typeorm';
import { ShowEntity } from '../entities/show.entity';

@Injectable()
export class SchedulerService {
  constructor(
    @Inject(SchedulerConfig.KEY)
    private readonly schedulerConfig: ConfigType<typeof SchedulerConfig>,
    private readonly databaseConnection: Connection,
  ) {}

  @Cron(CronExpression.EVERY_WEEK)
  async removeObsoleteShows() {
    const obsoleteFrom = DateTime.local()
      .minus({
        weeks: this.schedulerConfig.favorites.cleanUp.obsoleteFrom.weeks,
      })
      .toJSDate();

    const obsoleteShows = await this.findObsoleteShows({
      obsoleteFrom,
    });

    await this.databaseConnection
      .getRepository(ShowEntity)
      .remove(obsoleteShows);

    await this.removeObsoleteFiles();
  }

  private async findObsoleteShows({ obsoleteFrom }): Promise<ShowEntity[]> {
    return await this.databaseConnection
      .createQueryBuilder()
      .from(ShowEntity, 'show')
      .select('show')
      .leftJoinAndSelect('show.userFavoriteReferences', 'favorite')
      .where('favorite.id IS NULL')
      .andWhere('show.lastFavoritedAt < :obsoleteFrom', { obsoleteFrom })
      .getMany();
  }

  private async removeObsoleteFiles(): Promise<void> {
    await this.databaseConnection.query(
      `DELETE
        FROM files WHERE files.id IN
        (SELECT files.id from files LEFT JOIN shows ON shows."imageId" = files.id
        LEFT JOIN seasons ON seasons."imageId" = files.id
        LEFT JOIN episodes ON episodes."imageId" = files.id
        WHERE shows.id IS NULL AND seasons.id IS NULL AND episodes.id IS NULL);`,
      [],
    );
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { chain } from 'lodash';
import { DateTime } from 'luxon';
import { SchedulerConfig } from 'src/config/scheduler.config';
import { EmailsService } from 'src/modules/emails/services/emails.service';
import { FilesService } from 'src/modules/files/services/files.service';
import { Connection } from 'typeorm';
import {
  INotificationRecipient,
  IUpcomingEpisode,
} from '../interfaces/upcoming-episode.interface';
import { ShowsService } from './shows.service';

@Injectable()
export class SchedulerService {
  constructor(
    @Inject(SchedulerConfig.KEY)
    private readonly schedulerConfig: ConfigType<typeof SchedulerConfig>,
    private schedulerRegistry: SchedulerRegistry,
    private readonly databaseConnection: Connection,
    private readonly showsService: ShowsService,
    private readonly filesService: FilesService,
    private readonly emailsService: EmailsService,
  ) {
    this.bootstrapCronJobs();
  }

  private bootstrapCronJobs() {
    const cleanupJob = new CronJob(
      this.schedulerConfig.favorites.cleanUp.cronJob.interval,
      () => this.removeObsoleteShows(),
    );
    this.schedulerRegistry.addCronJob('removeObsoleteShows', cleanupJob);
    cleanupJob.start();

    const notificationJob = new CronJob(
      this.schedulerConfig.notifications.cronJob.interval,
      () => this.notifyOfUpcomingEpisodes(),
    );
    this.schedulerRegistry.addCronJob(
      'notifyOfUpcomingEpisodes',
      notificationJob,
    );
    notificationJob.start();
  }

  private async removeObsoleteShows(): Promise<void> {
    const obsoleteFrom = DateTime.local()
      .minus({
        weeks: this.schedulerConfig.favorites.cleanUp.obsoleteFrom.weeks,
      })
      .toJSDate();
    const { obsoleteShows } = await this.showsService.findObsoleteShows({
      obsoleteFrom,
    });

    await this.showsService.deleteObsoleteShows({ obsoleteShows });
    await this.filesService.removeObsoleteFiles();
  }

  private async notifyOfUpcomingEpisodes(): Promise<void> {
    const upcomingEpisodes: IUpcomingEpisode[] =
      await this.databaseConnection.query(
        `SELECT 
        DISTINCT ON (episodes.id)
        episodes.id, 
        episodes.name AS "episodeName", 
        episodes.number AS "episodeNumber", 
        episodes.summary AS "episodeSummary", 
        episodes."airDate" AS "episodeAirDate", 
        seasons.number AS "seasonNumber", 
        shows.name AS "showName", 
        users.email AS "userEmail", 
        users."firstName" AS "userFirstName" 
        FROM 
        episodes 
        INNER JOIN seasons ON episodes."seasonId" = seasons.id 
        INNER JOIN shows ON seasons."showId" = shows.id 
        LEFT JOIN user_favorite_shows ON shows.id = user_favorite_shows."showId" 
        INNER JOIN users ON user_favorite_shows."userId" = users.id 
        WHERE 
        episodes."airDate" BETWEEN NOW() 
        AND NOW() + $1 :: interval 
        AND user_favorite_shows."isNotificationEnabled" = true;`,
        [this.schedulerConfig.notifications.noticePeriod],
      );

    const sortedByRecipient: INotificationRecipient[] = chain(upcomingEpisodes)
      .groupBy('userEmail')
      .map((episodes, email) => ({
        email,
        firstName: episodes[0]?.userFirstName,
        episodes,
      }))
      .value();

    console.log('coucou');

    await Promise.all(
      sortedByRecipient.map(async (recipientData) => {
        await this.emailsService.sendTemplatedEmail({
          to: recipientData.email,
          subject: `Your Upcoming Episodes in the next ${this.schedulerConfig.notifications.noticePeriod}`,
          template: 'upcoming-notification',
          data: {
            firstName: recipientData.firstName,
            episodes: recipientData.episodes,
            noticePeriod: this.schedulerConfig.notifications.noticePeriod,
          },
        });
      }),
    );
  }
}

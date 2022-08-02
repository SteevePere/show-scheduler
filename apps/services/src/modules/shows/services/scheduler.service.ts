import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { chain } from 'lodash';
import { DateTime } from 'luxon';
import { SchedulerConfig } from 'src/config/scheduler.config';
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
      DISTINCT ON (episodes.id) episodes.id, 
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
      .map((value, key) => ({ userEmail: key, episodes: value }))
      .value();

    await Promise.all(
      sortedByRecipient.map(async (recipientData) => {
        console.log(recipientData);
      }),
    );
  }
}

// [
//   {
//     email: 'steevepere@gmail.com',
//     episodes: [
//       {
//         id: '2d34b40c-4ca5-4954-acc8-8e680b948968',
//         episodeName: 'Rabid Dog',
//         episodeNumber: 12,
//         episodeSummary: '<p>An unusual strategy starts to bear fruit, while plans are set in motion that could change everything.</p>',
//         episodeAirDate: 2022-08-04T19:40:54.149Z,
//         seasonNumber: 5,
//         showName: 'Breaking Bad',
//         userEmail: 'steevepere@gmail.com',
//         userFirstName: 'Steeve'
//       },
//       {
//         id: '3d60dd71-2149-4ebb-9167-66a77de3261a',
//         episodeName: 'Caballo sin Nombre',
//         episodeNumber: 2,
//         episodeSummary: '<p>Despite ever-increasing tension between Walt and Skyler, he pulls out all the stops in an effort to reconcile with the family. Elsewhere, Saul is instrumental in getting Jesse involved in a most-unusual investment opportunity.</p>',
//         episodeAirDate: 2022-08-04T19:40:54.149Z,
//         seasonNumber: 3,
//         showName: 'Breaking Bad',
//         userEmail: 'steevepere@gmail.com',
//         userFirstName: 'Steeve'
//       }
//     ]
//   },
//   {
//     email: 'steevegump@gmail.com',
//     episodes: [
//       {
//         id: 'cbcb503f-2ff4-4934-99a2-7b6c04ce08e0',
//         episodeName: 'Port in a Storm',
//         episodeNumber: 12,
//         episodeSummary: '<p><i>"Business. Always business." – The Greek</i><br />The stevedores gather for work as a floating corpse is pulled from the water. Once it is ashore, they all recognize the body as Frank Sobotka. The Greek opts to stop pursuing Nick because the police are on his heels, and walks away from Baltimore. The FBI visits the union hall and tells them that they need to change their leadership or face decertification. The union remains loyal and seals the destruction of their future. Urban reform begins to hit Baltimore as the docks undergo construction. Omar vows revenge against Stringer. Stringer cements his deal with Proposition Joe now that Mouzone is out of the way. Bubblesis arrested and alerts Greggs and McNulty to the relationship between Proposition Joe and Stringer Bell in exchange for his release.</p>',
//         episodeAirDate: 2022-08-04T19:40:54.149Z,
//         seasonNumber: 2,
//         showName: 'The Wire',
//         userEmail: 'steevegump@gmail.com',
//         userFirstName: 'Steeve'
//       }
//     ]
//   }
// ]

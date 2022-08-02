export interface IUpcomingEpisode {
  id: string;
  episodeName: string;
  episodeNumber: number;
  episodeSummary: string;
  episodeAirDate: Date;
  seasonNumber: number;
  showName: string;
  userEmail: string;
  userFirstName: string;
}

export interface INotificationRecipient {
  email: string;
  firstName: string;
  episodes: IUpcomingEpisode[];
}

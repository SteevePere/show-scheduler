import { EpisodeObject, SeasonObject } from '@scheduler/shared';
import { Divider, Row } from 'antd';

const MAX_DESC_LEN = 450;

interface ISeasonCardBodyProps {
  season: SeasonObject;
  episodes: EpisodeObject[];
  seasonFullText?: boolean;
};

const SeasonCardBody = (props: ISeasonCardBodyProps) => {
  const {
    season,
    episodes,
    seasonFullText = true,
  } = props;

  const truncatedSummary = !seasonFullText && !!season.summary
    && season.summary.length > MAX_DESC_LEN
    ? season.summary.substring(0, MAX_DESC_LEN) + '...'
    : season.summary;

  return (
    <>
      <p style={{ textAlign: 'left' }}>
        {truncatedSummary}
      </p>
      {!!episodes.length && 
      <>
        <Divider/>
        {episodes.map((episode) => (
          <Row key='row_ep'>{episode.externalId}</Row>
        ))}
      </>
      }
    </>
  );
};

export default SeasonCardBody;

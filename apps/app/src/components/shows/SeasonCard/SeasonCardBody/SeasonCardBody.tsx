import { EpisodeObject, SeasonObject } from '@scheduler/shared';
import { Divider, Row } from 'antd';
import EpisodeCard from 'components/shows/EpisodeCard/EpisodeCard';
import { useTruncatedText } from 'hooks/use-truncated-text.hook';

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

  const truncatedSummary = useTruncatedText({
    text: season.summary,
    isFullText: seasonFullText,
    maxLength: MAX_DESC_LEN,
  });

  return (
    <>
      <p style={{ textAlign: 'left' }}>
        {truncatedSummary}
      </p>
      {!!episodes.length && 
      <>
        <Divider/>
        {episodes.map((episode) => (
          <>
            <Row key='row_ep'>
              <EpisodeCard
                key='card'
                episode={episode}
              />
            </Row>
            <Divider/>
          </>
        ))}
      </>
      }
    </>
  );
};

export default SeasonCardBody;

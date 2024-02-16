import { EpisodeObject } from '@scheduler/shared';
import { useTruncatedText } from 'hooks/use-truncated-text.hook';

const MAX_DESC_LEN = 450;

interface ISeasonCardBodyProps {
  episode: EpisodeObject;
  episodeFullText?: boolean;
};

const EpisodeCardBody = (props: ISeasonCardBodyProps) => {
  const {
    episode,
    episodeFullText = true,
  } = props;

  const truncatedSummary = useTruncatedText({
    text: episode.summary,
    isFullText: episodeFullText,
    maxLength: MAX_DESC_LEN,
  });

  return (
    <p style={{ textAlign: 'left' }}>
      {truncatedSummary}
    </p>
  );
};

export default EpisodeCardBody;

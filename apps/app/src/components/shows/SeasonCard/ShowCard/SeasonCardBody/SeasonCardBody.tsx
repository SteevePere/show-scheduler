import { SeasonObject } from '@scheduler/shared';

const MAX_DESC_LEN = 450;

interface ISeasonCardBodyProps {
  season: SeasonObject;
  seasonFullText?: boolean;
};

const SeasonCardBody = (props: ISeasonCardBodyProps) => {
  const {
    season,
    seasonFullText = true,
  } = props;

  const truncatedSummary = !seasonFullText && !!season.summary
    && season.summary.length > MAX_DESC_LEN
    ? season.summary.substring(0, MAX_DESC_LEN) + '...'
    : season.summary;

  return (
    <p style={{ textAlign: 'left' }}>
      {truncatedSummary}
    </p>
  );
};

export default SeasonCardBody;

import { SeasonObject } from '@scheduler/shared';
import { Col, Row } from 'antd';
import LoadingSpinner from 'components/shared/LoadingSpinner/LoadingSpinner';

import SeasonCard from '../SeasonCard/SeasonCard';

interface ISeasonListProps {
  seasons: SeasonObject[];
  loading: boolean;
}

const SeasonList = (props: ISeasonListProps) => {
  const { seasons, loading } = props;

  return (
    <>
      {seasons && !loading && seasons.map((season: SeasonObject) =>
        <Row key={`row_${season.externalId}`} style={{ marginBottom: 20 }}>
          <SeasonCard key={`season_card_${season.externalId}`} season={season}/>
        </Row>
      )}
      {loading &&
      <Col span={24}>
        <LoadingSpinner marginTop='25vh' size='large'/>
      </Col>}
    </>
  );
};
        
export default SeasonList;
import { SeasonObject, ShowObject } from '@scheduler/shared';
import { Col, Row } from 'antd';
import LoadingSpinner from 'components/shared/LoadingSpinner/LoadingSpinner';

import SeasonCard from '../SeasonCard/ShowCard/SeasonCard';

interface ISeasonListProps {
  show: ShowObject | null;
  loading: boolean;
}

const SeasonList = (props: ISeasonListProps) => {
  const { show, loading } = props;

  return (
    <>
      {show && show.seasons && !loading && show.seasons.map((season: SeasonObject) =>
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
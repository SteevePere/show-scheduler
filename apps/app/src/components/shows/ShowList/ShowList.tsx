import { ShowObject } from '@scheduler/shared';
import { Col, Empty, Row } from 'antd';
import LoadingSpinner from 'components/shared/LoadingSpinner/LoadingSpinner';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

import ShowCard from '../ShowCard/ShowCard';

const ShowList = () => {
  const { shows, searched, loading } = useSelector((state: RootState) => state.shows);

  return (
    <Row gutter={[24, 24]}>
      {!loading && shows?.map((show: ShowObject) =>
        <Col
          xl={8}
          lg={24}
          md={24}
          xs={24}
          key={'col_' + show.externalId}
        >
          <ShowCard
            show={show}
            showFullText={false}
          />
        </Col>
      )}
      {!!searched && !loading && !shows?.length &&
        <Empty
          description='No Shows were found'
          className='empty'
        />}
      {loading &&
      <Col span={24}>
        <LoadingSpinner marginTop='25vh' size='large'/>
      </Col>
      }
    </Row>
  );
};
        
export default ShowList;
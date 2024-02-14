import { Col, Divider, Row } from 'antd';
import SearchShows from 'components/shows/SearchShows/SearchShows';
import ShowList from 'components/shows/ShowList/ShowList';

export const SearchView = () => {
  return (
    <Row
      align='middle'
      justify='center'
      style={{ paddingBottom: 25 }}
    >
      <Col
        span={24}
        md={{ span: 18 }}
      >
        <SearchShows/>
        <Divider/>
        <ShowList/>
      </Col>
    </Row>
  );
};

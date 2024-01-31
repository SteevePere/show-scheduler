import {
  HomeOutlined
} from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import { NavLink } from 'react-router-dom';

import './NotFound.css';

const NotFound = () => {
  return (
	  <Card
	    id='not-found'
	    bordered={false}
	  >
	    <Row
	      gutter={[24, 24]}
	    >
	      <Col
	        span={24}
	        style={{ textAlign: 'center' }}
	      >
	        <img
	          src={process.env.PUBLIC_URL + '/404.png'}
	          alt='Not Found'
	          style={{ margin: 'auto', height: 330 }}
	        />
	      </Col>
	      <Col
	        span={24}
	        style={{ textAlign: 'center' }}
	      >
	        <NavLink to='/posts'>
	          <Button>
	            <HomeOutlined/>
				    Help me, Obi-Wan Kenobi !
	          </Button>
	        </NavLink>
	      </Col>
	    </Row>
	  </Card>
  );
};


export default NotFound;
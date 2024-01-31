import { Card, Col, Divider, Row } from 'antd';
import Logo from 'layout/Logo/Logo';

interface BaseLayoutProps {
  content: JSX.Element;
  ctas?: JSX.Element;
};

const BaseLayout = (props: BaseLayoutProps) => {
  const {
	  content,
    ctas,
  } = props;

  return (
    <Row className='page-container'>
      <Col span={22} md={{ span: 12 }} xxl={{ span: 8 }}>
        <Card>
          <Row align='middle' justify='center'>
            <Logo width='25%' padding={0}/>
          </Row>
          <Divider style={{ marginTop: 15 }}/>
          <>
            { content }
          </>
          <Divider style={{ marginBottom: 15 }}/>
          <Row align='middle' justify='center'>
            <>
              { ctas }
            </>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default BaseLayout;
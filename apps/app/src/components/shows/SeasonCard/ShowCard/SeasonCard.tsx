import {
  EyeOutlined
} from '@ant-design/icons';
import { SeasonObject } from '@scheduler/shared';
import { Card, Space } from 'antd';
import { NavLink } from 'react-router-dom';

import SeasonCardBody from './SeasonCardBody/SeasonCardBody';
import SeasonCardHeader from './SeasonCardHeader/SeasonCardHeader';

interface ISeasonCardProps {
  season: SeasonObject;
  hideViewButton?: boolean;
  SeasonFullText?: boolean;
};

const SeasonCard = (props: ISeasonCardProps) => {
  const { season, hideViewButton = false } = props;

  const ViewButton = () => {
    return (
      <NavLink
        to={'/season/' + season.externalId}
      >
        <Space>
          <EyeOutlined
            key='view_eye'
          />
            View Episodes
        </Space>
      </NavLink>
    );
  };

  const getActions = () => {
    const actions = [];

    if (!hideViewButton) {
      actions.push(<ViewButton key='view'/>);
    }

    return actions;
  };

  const displayCard = () => {
    return (
      <Card
        hoverable={!hideViewButton}
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: '1',
        }}
        bodyStyle={{
          flexGrow: '1',
        }}
        actions={getActions()}
      >
        <SeasonCardHeader
          {...props}
          backgroundPosition='0 -70px'
        />
        <SeasonCardBody
          {...props}
        />
      </Card>
    );
  };

  return displayCard();
};

export default SeasonCard;

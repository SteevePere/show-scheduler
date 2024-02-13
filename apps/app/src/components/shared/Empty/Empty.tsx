import React from 'react';

import { ReactComponent as EmptyLogo } from '../../../assets/images/empty.svg';

interface EmptyProps {
  title?: string;
  height?: number | undefined;
}

export const Empty = (props: EmptyProps) => {
  const { title = 'No Data', height } = props;

  return (
    <div style={{ textAlign: 'center' }}>
      <EmptyLogo style={{ height: height }}/>
      <p>{title}</p>
    </div>
  );
};

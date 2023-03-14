import React from 'react';

import { ReactComponent as EmptyLogo } from '../../../assets/images/empty.svg';

interface EmptyProps {
  title?: string;
}

export const Empty = (props: EmptyProps) => {
  const { title = 'No Data' } = props;

  return (
    <>
      <EmptyLogo />
      <p>{title}</p>
    </>
  );
};

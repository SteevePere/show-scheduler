import { ShowObject } from '@scheduler/shared';

interface IShowCardBodyProps {
  show: ShowObject;
};

const MAX_DESC_LEN = 400;

const ShowCardBody = (props: IShowCardBodyProps) => {
  const {
    show,
  } = props;

  const truncatedSummary = !!show.summary && show.summary.length > MAX_DESC_LEN
    ? show.summary.substring(0, MAX_DESC_LEN) + '...'
    : show.summary;

  return (
    <div style={{ textAlign: 'left' }}>
      {truncatedSummary}
    </div>
  );
};

export default ShowCardBody;

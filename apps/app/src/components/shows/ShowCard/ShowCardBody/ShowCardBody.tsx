import { ShowObject } from '@scheduler/shared';
import { Empty } from 'components/shared/Empty/Empty';

const MAX_DESC_LEN = 450;

interface IShowCardBodyProps {
  show: ShowObject;
  showFullText?: boolean;
};

const ShowCardBody = (props: IShowCardBodyProps) => {
  const {
    show,
    showFullText = true,
  } = props;

  const truncatedSummary = !showFullText && !!show.summary
    && show.summary.length > MAX_DESC_LEN
    ? show.summary.substring(0, MAX_DESC_LEN) + '...'
    : show.summary;

  return (
    <div style={{ textAlign: 'left' }}>
      {truncatedSummary || <Empty title='No Summary' height={100}/>}
    </div>
  );
};

export default ShowCardBody;

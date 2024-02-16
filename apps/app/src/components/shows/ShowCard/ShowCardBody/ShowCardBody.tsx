import { ShowObject } from '@scheduler/shared';
import { Empty } from 'components/shared/Empty/Empty';
import { useTruncatedText } from 'hooks/use-truncated-text.hook';

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

  const truncatedSummary = useTruncatedText({
    text: show.summary,
    isFullText: showFullText,
    maxLength: MAX_DESC_LEN,
  });

  return (
    <div style={{ textAlign: 'left' }}>
      {truncatedSummary || <Empty title='No Summary' height={100}/>}
    </div>
  );
};

export default ShowCardBody;

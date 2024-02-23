import {
  CheckCircleFilled,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { EpisodeObject, ToggleEpisodeWatchedRequest } from '@scheduler/shared';
import { Button } from 'antd';
import { useAppDispatch } from 'hooks/use-app-dispatch.hook';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { setEpisodeWatched } from 'store/shows/shows.thunks';
import { RootState } from 'store/store';

interface IWatchedButtonProps {
  episode: EpisodeObject;
}

export const WatchedButton = (props: IWatchedButtonProps) => {
  const { episode } = props;
  const dispatch = useAppDispatch();
  const { toggleWatchedLoading } = useSelector((state: RootState) => state.shows);

  const isWatchedByUser = useMemo(() => {
    return episode.isWatchedByUser;
  }, [episode.isWatchedByUser]);

  const isLoading = useMemo(() => {
    return toggleWatchedLoading.state &&
      toggleWatchedLoading.episodeExternalId === episode.externalId;
  }, [episode, toggleWatchedLoading]);

  const toggleEpisodeWatched = useCallback(async (values: ToggleEpisodeWatchedRequest) => {
    dispatch(setEpisodeWatched(values));
  }, [dispatch, setEpisodeWatched]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    
    toggleEpisodeWatched({
      externalId: episode.externalId,
      isWatched: !isWatchedByUser,
    });
  }, [isWatchedByUser]);
  
  return (
    <Button
      key='add_plus'
      icon={isWatchedByUser ? <CheckCircleFilled className='primary'/> : <CheckCircleOutlined/>}
      onClick={handleClick}
      loading={isLoading}
    >
      {isWatchedByUser ? 'Remove from watched Episodes' : 'Add to watched Episodes'}
    </Button>
  );
};
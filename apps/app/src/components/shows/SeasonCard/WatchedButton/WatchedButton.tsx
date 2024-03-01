import {
  CheckCircleFilled,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { EpisodeObject, SeasonObject, ToggleSeasonWatchedRequest } from '@scheduler/shared';
import { Button } from 'antd';
import { useAppDispatch } from 'hooks/use-app-dispatch.hook';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { setEpisodeWatched, setSeasonWatched } from 'store/shows/shows.thunks';
import { RootState } from 'store/store';

interface IWatchedButtonProps {
  season: SeasonObject;
  episodes: EpisodeObject[]; // remove this ?
}

export const WatchedButton = (props: IWatchedButtonProps) => {
  const { season } = props;
  const dispatch = useAppDispatch();
  const { toggleWatchedLoading } = useSelector((state: RootState) => state.shows);

  const isWatchedByUser = useMemo(() => {
    return season.isWatchedByUser;
  }, [season]);

  const isLoading = useMemo(() => {
    return toggleWatchedLoading.state &&
      toggleWatchedLoading.seasonExternalId === season.externalId;
  }, [season, toggleWatchedLoading]);

  const toggleSeasonWatched = useCallback((values: ToggleSeasonWatchedRequest) => {
    dispatch(setSeasonWatched(values));
  }, [dispatch, setEpisodeWatched]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    
    toggleSeasonWatched({
      externalId: season.externalId,
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
      {isWatchedByUser ? 'Remove from watched Seasons' : 'Add to watched Seasons'}
    </Button>
  );
};
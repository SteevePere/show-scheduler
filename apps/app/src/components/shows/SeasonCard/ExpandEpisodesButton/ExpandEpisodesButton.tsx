import {
  ArrowUpOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { SeasonObject } from '@scheduler/shared';
import { Button } from 'antd';
import { useAppDispatch } from 'hooks/use-app-dispatch.hook';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { setEpisodes } from 'store/shows/shows.slice';
import { findSeasonEpisodes } from 'store/shows/shows.thunks';
import { RootState } from 'store/store';
  
interface IExpandEpisodesButton {
  season: SeasonObject;
};
  
const ExpandEpisodesButton = (props: IExpandEpisodesButton) => {
  const { season } = props;
  const dispatch = useAppDispatch();
  
  const { episodes, episodesLoading } = useSelector((state: RootState) => state.shows);
      
  const isEpisodesLoaded = useMemo(() => {
    return episodes.episodes.length > 0 &&
        episodes.seasonExternalId === season.externalId;
  }, [season, episodes]);
  
  const isEpisodesLoading = useMemo(() => {
    return episodesLoading.state === true 
        && episodesLoading.seasonExternalId === season.externalId;
  }, [season.externalId, episodesLoading]);
  
  const handleExpand = useCallback(async () => {
    dispatch(findSeasonEpisodes({ seasonExternalId: season.externalId }));
  }, [season, findSeasonEpisodes]);
  
  const handleCollapse = useCallback(() => {
    dispatch(setEpisodes({
      seasonExternalId: null,
      episodes: [],
    }));
  }, [setEpisodes]);
  
  return (
    <Button
      onClick={isEpisodesLoaded ? handleCollapse : handleExpand}
      loading={isEpisodesLoading}
      icon={isEpisodesLoaded ? <ArrowUpOutlined/> : <EyeOutlined/>}
    >
      {isEpisodesLoaded ? 'Hide Episodes' : 'View Episodes'}
    </Button>
  );
};
  
export default ExpandEpisodesButton;
  
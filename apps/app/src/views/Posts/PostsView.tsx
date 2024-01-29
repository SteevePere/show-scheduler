import PostTable from 'components/posts/PostsTable';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

export const PostsView = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  
  if (!currentUser) {
    return null;
  }

  return (
    <PostTable/>
  );
};

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchPosts } from '../store/postsSlice';
import { Post } from '../types';
import { RootState } from '../store/store';
import { removePost } from '../store/postsSlice';

const List = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state: RootState) => state.posts.data);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <ul>
      {posts.map((post: Post) => (
        <li
          key={post.id}
          className='border relative'>
          <div className='flex'>
            <div className='p-5 flex flex-col gap-1'>
              <p>{post.id}</p>
              <h4 className='text-red font-bold'>{post.title}</h4>
              <p className=''>{post.body}</p>
            </div>
            <button
              className='absolute top-0 right-0 m-5 text-lg'
              onClick={() => dispatch(removePost(post.id))}>
              X
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default List;

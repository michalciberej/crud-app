import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchPosts } from '../store/postsSlice';
import { Post } from '../types';
import { RootState } from '../store/store';
import { removePost } from '../store/postsSlice';

const List = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className='flex justify-center items-center'>
      <ul className='w-full gap-y-2 flex flex-col'>
        {posts.loading && <li className='text-center'>Loading...</li>}
        {posts.data.length > 0 &&
          posts.data.map((post: Post) => (
            <li
              key={post.id}
              className='border border-slate-700 relative bg-slate-300'>
              <div className='flex'>
                <div className='p-5 flex flex-col gap-1'>
                  <p>ID: {post.id}</p>
                  <h4 className='text-red font-bold'>{post.title}</h4>
                  <p className='max-w-[100ch]'>{post.body}</p>
                </div>
                <button
                  className='absolute top-0 right-0 m-5 text-lg bg-slate-700 text-slate-50 px-[7px] rounded-full flex justify-center items-center leading-tight hover:bg-slate-900'
                  onClick={() => dispatch(removePost(post.id))}>
                  x
                </button>
              </div>
            </li>
          ))}
        {posts.error && (
          <li className='text-center text-red-500'>{posts.error}</li>
        )}
      </ul>
    </div>
  );
};

export default List;

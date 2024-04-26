import { ChangeEvent } from 'react';
import { useState } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { Post } from '../types';
import { addPost, updatePost } from '../store/postsSlice';

const emptyPost: Post = {
  userId: 0,
  id: 0,
  title: '',
  body: '',
};

const Form = () => {
  const [formData, setFormData] = useState(emptyPost);
  const dispatch = useAppDispatch();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form className='flex flex-col border border-slate-700 bg-slate-300 gap-2 p-5 sticky h-min top-2'>
      <h2 className='text-xl text-center font-bold'>Add or Update posts</h2>
      <div>
        <label htmlFor='id'>
          ID
          <input
            type='number'
            min={0}
            name='id'
            className='border px-2 border-slate-700 w-full'
            value={formData.id}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label htmlFor='title'>
          Title
          <input
            type='text'
            name='title'
            id='title'
            className='border px-2 border-slate-700 w-full'
            value={formData.title}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label htmlFor='body'>
          Body
          <textarea
            name='body'
            id='body'
            className='border px-2 border-slate-700 w-full'
            value={formData.body}
            onChange={(e) => handleChange(e)}
          />
        </label>
      </div>
      <div className='flex gap-2'>
        <button
          type='button'
          className='w-full bg-slate-700 text-slate-50 py-1 hover:bg-slate-900 focus:bg-slate-900'
          onClick={(e) => {
            e.preventDefault();
            dispatch(addPost(formData));
            setFormData(emptyPost);
          }}>
          Add Post
        </button>
        <button
          type='button'
          className='w-full bg-slate-700 text-slate-50 py-1 hover:bg-slate-900 focus:bg-slate-900'
          onClick={(e) => {
            e.preventDefault();
            dispatch(updatePost(formData));
            setFormData(emptyPost);
          }}>
          Update Post
        </button>
      </div>
    </form>
  );
};

export default Form;

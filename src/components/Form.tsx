import React, { ChangeEvent } from 'react';
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
    <form className='flex flex-col border gap-2 p-5 sticky h-min top-2'>
      <input
        type='number'
        min={0}
        name='id'
        className='border px-2'
        value={formData.id}
        placeholder='Id'
        onChange={(e) => handleChange(e)}
      />
      <input
        type='text'
        name='title'
        className='border px-2'
        value={formData.title}
        placeholder='Title'
        onChange={(e) => handleChange(e)}
      />
      <textarea
        name='body'
        className='border px-2'
        value={formData.body}
        placeholder='Body'
        onChange={(e) => handleChange(e)}
      />
      <button
        type='button'
        className='w-full bg-slate-300'
        onClick={(e) => {
          e.preventDefault();
          dispatch(addPost(formData));
          setFormData(emptyPost);
        }}>
        Submit
      </button>
      <button
        type='button'
        className='w-full bg-slate-300'
        onClick={(e) => {
          e.preventDefault();
          dispatch(updatePost(formData));
          setFormData(emptyPost);
        }}>
        Update
      </button>
    </form>
  );
};

export default Form;

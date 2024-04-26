import { createSlice } from '@reduxjs/toolkit';
import { PostsState } from '../types';
import { PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState: PostsState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk('user/fetchUsers', () => {
  return axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.data);
});

const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.data.push(action.payload);
    },
    removePost: (state, action) => {
      state.data = state.data.filter(
        (post: Post) => post.id !== action.payload
      );
    },
    updatePost: (state, action) => {
      state.data = state.data.map((post: Post) =>
        post.id === Number(action.payload.id) ? action.payload : post
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
      }
    );
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export const { addPost, removePost, updatePost } = postsSlice.actions;

export default postsSlice.reducer;

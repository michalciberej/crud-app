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

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  return await axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.data);
});

const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost: (state, action) => {
      const doesIDExist = state.data.filter(
        (post) => post.id === +action.payload.id
      );

      if (doesIDExist.length > 0) {
        state.data = state.data.map((post: Post) =>
          post.id === +action.payload.id ? action.payload : post
        );
      } else {
        state.data.push(action.payload);
      }
    },
    removePost: (state, action) => {
      state.data = state.data.filter(
        (post: Post) => post.id !== action.payload
      );
    },
    updatePost: (state, action) => {
      state.data = state.data.map((post: Post) =>
        post.id === +action.payload.id ? action.payload : post
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

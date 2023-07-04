import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

const initialState = {
    entities: [],
    isLoading: false,
    error: null
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getPostsAsync.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getPostsAsync.fulfilled, (state, action) => {
      state.entities.push(...action.payload);
      state.isLoading = false;
    })
    .addCase(getPostsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'Something went wrong!';
    })
  }
});

export const getPostsAsync = createAsyncThunk('posts/getPosts', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  return response.json();
})

export default postSlice.reducer;
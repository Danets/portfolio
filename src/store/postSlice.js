import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  entities: [],
  isLoading: false,
  error: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostsAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPostsAsync.fulfilled, (state, action) => {
        state.entities = action.payload;
      })
      .addCase(getPostsAsync.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const getPostsAsync = createAsyncThunk(
  "posts/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      return response.json();
    } catch (error) {
      return rejectWithValue("Something went wrong during loading posts!");
    }
  }
);

export default postSlice.reducer;

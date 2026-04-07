import { postsApi } from "@/api/postsApi";
import type { Post } from "@/types/post";
import type { CreatePostDto, UpdatePostDto } from "@/types/postDto";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  isInitLoading: boolean;
  isSubmitLoading: boolean;
  error: string | null;
}

const initState: PostsState = {
  posts: [],
  currentPost: null,
  isInitLoading: true,
  isSubmitLoading: false,
  error: null,
};

export const fetchPostsThunk = createAsyncThunk(
  "posts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await postsApi.getAll();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch posts",
      );
    }
  },
);

export const fetchPostsByUserThunk = createAsyncThunk(
  "posts/fetchAllByUser",
  async (userId: number, { rejectWithValue }) => {
    try {
      return await postsApi.getAllByUserId(userId);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          `Failed to fetch posts by user with id ${userId}`,
      );
    }
  },
);

export const fetchPostByIdThunk = createAsyncThunk(
  "posts/fetchById",
  async (id: number, { rejectWithValue }) => {
    try {
      return await postsApi.getOne(id);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || `Failed to fetch post with id ${id}`,
      );
    }
  },
);

export const createPostThunk = createAsyncThunk(
  "posts/create",
  async (dto: CreatePostDto, { rejectWithValue }) => {
    try {
      return await postsApi.create(dto);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || `Failed to create new post`,
      );
    }
  },
);

interface UpdatePostProps {
  dto: UpdatePostDto;
  id: number;
}

export const updatePostThunk = createAsyncThunk(
  "posts/update",
  async ({ dto, id }: UpdatePostProps, { rejectWithValue }) => {
    try {
      return await postsApi.update(dto, id);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          `Failed to update the post with id ${id}`,
      );
    }
  },
);

export const DeletePostThunk = createAsyncThunk(
  "posts/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await postsApi.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          `Failed to update the post with id ${id}`,
      );
    }
  },
);

const postsSlice = createSlice({
  name: "posts",
  initialState: initState,
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsThunk.pending, (state) => {
        state.isInitLoading = true;
        state.error = null;
      })
      .addCase(
        fetchPostsThunk.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.isInitLoading = false;
          state.posts = action.payload;
        },
      )
      .addCase(fetchPostsThunk.rejected, (state, action) => {
        state.isInitLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchPostByIdThunk.pending, (state) => {
        state.isSubmitLoading = true;
        state.error = null;
      })
      .addCase(
        fetchPostByIdThunk.fulfilled,
        (state, action: PayloadAction<Post>) => {
          state.isSubmitLoading = false;
          state.currentPost = action.payload;
        },
      )
      .addCase(fetchPostByIdThunk.rejected, (state, action) => {
        state.isSubmitLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchPostsByUserThunk.pending, (state) => {
        state.isInitLoading = true;
        state.error = null;
      })
      .addCase(
        fetchPostsByUserThunk.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.isInitLoading = false;
          state.posts = action.payload;
        },
      )
      .addCase(fetchPostsByUserThunk.rejected, (state, action) => {
        state.isInitLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(createPostThunk.pending, (state) => {
        state.isSubmitLoading = true;
        state.error = null;
      })
      .addCase(
        createPostThunk.fulfilled,
        (state, action: PayloadAction<Post>) => {
          state.isSubmitLoading = false;
          state.posts?.unshift(action.payload);
        },
      )
      .addCase(createPostThunk.rejected, (state, action) => {
        state.isSubmitLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updatePostThunk.pending, (state) => {
        state.isSubmitLoading = true;
        state.error = null;
      })
      .addCase(
        updatePostThunk.fulfilled,
        (state, action: PayloadAction<Post>) => {
          state.isSubmitLoading = false;
          const index =
            state.posts?.findIndex((p) => p.id === action.payload.id) ?? -1;
          if (index !== -1 && state.posts && state.posts?.at(index)) {
            state.posts[index] = action.payload;
          }
          if (state.currentPost?.id === action.payload.id) {
            state.currentPost = action.payload;
          }
        },
      )
      .addCase(updatePostThunk.rejected, (state, action) => {
        state.isSubmitLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(DeletePostThunk.pending, (state) => {
        state.isSubmitLoading = true;
        state.error = null;
      })
      .addCase(
        DeletePostThunk.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.isSubmitLoading = false;
          state.posts =
            state.posts?.filter((p) => p.id !== action.payload) ?? null;
        },
      )
      .addCase(DeletePostThunk.rejected, (state, action) => {
        state.isSubmitLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentPost, clearError } = postsSlice.actions;
export default postsSlice.reducer;

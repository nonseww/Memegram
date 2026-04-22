import { commentsApi } from "@/api/commentsApi";
import type { Comment, CreateCommentDto } from "@/types/commentDto";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { clearCurrentPost, fetchPostByIdThunk } from "./postsSlice";

interface CommentsState {
  comments: Comment[];
  currentPostId: number | null;
  isInitLoading: boolean;
  isSubmitLoading: boolean;
  error: string | null;
}

const initState: CommentsState = {
  comments: [],
  currentPostId: null,
  isInitLoading: false,
  isSubmitLoading: false,
  error: null,
};

export const fetchCommentsByPostIdThunk = createAsyncThunk<
  { postId: number; comments: Comment[] },
  number,
  { rejectValue: string }
>("comments/fetchByPostId", async (postId, { rejectWithValue }) => {
  try {
    const comments = await commentsApi.getByPostId(postId);
    return { postId, comments };
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message ||
        `Failed to fetch comments for post ${postId}`,
    );
  }
});

export const createCommentThunk = createAsyncThunk<
  Comment,
  CreateCommentDto,
  { rejectValue: string }
>("comments/createComment", async (dto, { rejectWithValue }) => {
  try {
    return await commentsApi.createComment(dto);
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to create comment",
    );
  }
});

const commentsSlice = createSlice({
  name: "comments",
  initialState: initState,
  reducers: {
    clearCommentsError: (state) => {
      state.error = null;
    },
    clearCommentsForPost: (state, action: PayloadAction<number>) => {
      if (state.currentPostId === action.payload) {
        state.comments = [];
        state.currentPostId = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByPostIdThunk.pending, (state) => {
        state.isInitLoading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByPostIdThunk.fulfilled, (state, action) => {
        state.isInitLoading = false;
        state.currentPostId = action.payload.postId;
        state.comments = action.payload.comments;
      })
      .addCase(fetchCommentsByPostIdThunk.rejected, (state, action) => {
        state.isInitLoading = false;
        state.error = action.payload ?? "Failed to fetch comments";
      });

    builder
      .addCase(createCommentThunk.pending, (state) => {
        state.isSubmitLoading = true;
        state.error = null;
      })
      .addCase(createCommentThunk.fulfilled, (state, action) => {
        state.isSubmitLoading = false;

        if (state.currentPostId === action.payload.postId) {
          state.comments.unshift(action.payload);
        }
      })
      .addCase(createCommentThunk.rejected, (state, action) => {
        state.isSubmitLoading = false;
        state.error = action.payload ?? "Failed to create comment";
      });

    builder.addCase(fetchPostByIdThunk.fulfilled, (state, action) => {
      state.currentPostId = action.payload.id;
      state.comments = [];
    });

    builder.addCase(clearCurrentPost, (state) => {
      state.currentPostId = null;
      state.comments = [];
      state.error = null;
    });
  },
});

export const { clearCommentsError, clearCommentsForPost } =
  commentsSlice.actions;

export default commentsSlice.reducer;

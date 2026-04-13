import { profileApi } from "@/api/profileApi";
import type { UpdateProfileDto } from "@/types/profileDto";
import type { UserProfile } from "@/types/user";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

interface ProfileState {
  profile: UserProfile | null;
  isInitLoading: boolean;
  isSubmitLoading: boolean;
  error: string | null;
}

const initState: ProfileState = {
  profile: null,
  isInitLoading: true,
  isSubmitLoading: false,
  error: null,
};

export const fetchProfileByUsernameThunk = createAsyncThunk(
  "profile/username",
  async (username: string, { rejectWithValue }) => {
    try {
      return await profileApi.getUserByUsername(username);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || `Failed to fetch user ${username}`,
      );
    }
  },
);

export const updateProfileThunk = createAsyncThunk(
  "profile/update",
  async (dto: UpdateProfileDto, { rejectWithValue }) => {
    try {
      return await profileApi.updateProfile(dto);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile",
      );
    }
  },
);

export const toggleFollowThunk = createAsyncThunk(
  "profile/toggleFollow",
  async (followingId: number, { rejectWithValue }) => {
    try {
      return await profileApi.toggleFollow(followingId);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          `Failed to toggle follow with id ${followingId}`,
      );
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState: initState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileByUsernameThunk.pending, (state) => {
        state.isInitLoading = true;
        state.error = null;
      })
      .addCase(
        fetchProfileByUsernameThunk.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.isInitLoading = false;
          state.profile = action.payload;
        },
      )
      .addCase(fetchProfileByUsernameThunk.rejected, (state, action) => {
        state.isInitLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updateProfileThunk.pending, (state) => {
        state.isSubmitLoading = true;
        state.error = null;
      })
      .addCase(
        updateProfileThunk.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.profile = action.payload;
          state.isSubmitLoading = false;
        },
      )
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.isSubmitLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(toggleFollowThunk.pending, (state) => {
        state.isSubmitLoading = true;
        state.error = null;
      })
      .addCase(
        toggleFollowThunk.fulfilled,
        (state, action: PayloadAction<{ isFollowing: boolean }>) => {
          state.isSubmitLoading = false;
          if (state.profile) {
            state.profile.isFollowing = action.payload.isFollowing;
            state.profile.followersCount += action.payload.isFollowing ? 1 : -1;
          }
        },
      )
      .addCase(toggleFollowThunk.rejected, (state, action) => {
        state.isSubmitLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfile, clearError } = profileSlice.actions;
export default profileSlice.reducer;

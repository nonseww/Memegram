import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "@/api/authApi";
import type { LoginDto } from "@/types/loginDto";
import type { RegisterDto } from "@/types/registerDto";
import type { User } from "@/types/user";

interface AuthState {
  user: User | null;
  isAuth: boolean;
  isInitLoading: boolean;
  isSubmitLoading: boolean;
  error: string | null;
}

const initState: AuthState = {
  user: null,
  isAuth: false,
  isInitLoading: true,
  isSubmitLoading: false,
  error: null,
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (dto: LoginDto, { rejectWithValue }) => {
    try {
      const data = await authApi.login(dto);
      localStorage.setItem("accessToken", data.accessToken);
      return data.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (dto: RegisterDto, { rejectWithValue }) => {
    try {
      const data = await authApi.register(dto);
      localStorage.setItem("accessToken", data.accessToken);
      return data.user;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

export const checkAuthThunk = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return rejectWithValue("Not authenticated");
    }

    try {
      const data = await authApi.refresh();
      localStorage.setItem("accessToken", data.accessToken);

      const user = await authApi.getMe();
      return user;
    } catch (error: any) {
      localStorage.removeItem("accessToken");
      return rejectWithValue("Not authenticated");
    }
  },
);

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  try {
    await authApi.logout();
  } catch {
  } finally {
    localStorage.removeItem("accessToken");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isSubmitLoading = true;
        state.error = null;
      })

      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isSubmitLoading = false;
        state.isAuth = true;
      })

      .addCase(loginThunk.rejected, (state, action) => {
        state.isSubmitLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(registerThunk.pending, (state) => {
        state.isSubmitLoading = true;
        state.error = null;
      })

      .addCase(
        registerThunk.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload;
          state.isSubmitLoading = false;
          state.isAuth = true;
        },
      )

      .addCase(registerThunk.rejected, (state, action) => {
        state.isSubmitLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(checkAuthThunk.pending, (state) => {
        state.isInitLoading = true;
        state.error = null;
      })

      .addCase(
        checkAuthThunk.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload;
          state.isInitLoading = false;
          state.isAuth = true;
        },
      )

      .addCase(checkAuthThunk.rejected, (state) => {
        state.user = null;
        state.isInitLoading = false;
        state.error = null;
      });

    builder
      .addCase(logoutThunk.pending, (state) => {
        state.isSubmitLoading = true;
        state.error = null;
      })

      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
        state.error = null;
        state.isSubmitLoading = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;

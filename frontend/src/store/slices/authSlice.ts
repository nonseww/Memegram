import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "@/api/authApi";
import type { LoginDto } from "@/types/loginDto";
import type { RegisterDto } from "@/types/registerDto";
import type { User } from "@/types/user";

interface AuthState {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
}

const initState: AuthState = {
  user: null,
  isAuth: false,
  isLoading: true,
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
    console.log("1. checkAuthThunk STARTED");

    const token = localStorage.getItem("accessToken");
    if (!token) {
      return rejectWithValue("Not authenticated");
    }

    try {
      console.log("2. calling refresh...");

      const data = await authApi.refresh();
      console.log("3. refresh OK:", data);

      localStorage.setItem("accessToken", data.accessToken);

      console.log("4. calling getMe...");
      const user = await authApi.getMe();
      console.log("5. getMe OK:", user);

      return user;
    } catch (error: any) {
      console.log("6. FAILED:", error?.response?.status, error?.message);
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
        state.isLoading = true;
        state.error = null;
      })

      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isAuth = true;
      })

      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(
        registerThunk.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload;
          state.isLoading = false;
          state.isAuth = true;
        },
      )

      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error as string;
      });

    builder
      .addCase(checkAuthThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(
        checkAuthThunk.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload;
          state.isLoading = false;
          state.isAuth = true;
        },
      )

      .addCase(checkAuthThunk.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
        state.error = null;
      });

    builder
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
        state.error = null;
        state.isLoading = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;

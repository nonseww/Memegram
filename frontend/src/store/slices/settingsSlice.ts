import {
  createSlice,
  isPending,
  isFulfilled,
  isRejected,
  isRejectedWithValue,
  type PayloadAction,
} from "@reduxjs/toolkit";

interface SettingsState {
  pendingRequestsCount: number;
  isGlobalLoading: boolean;
  isErrorModalOpen: boolean;
  errorMessage: string | null;
}

const initialState: SettingsState = {
  pendingRequestsCount: 0,
  isGlobalLoading: false,
  isErrorModalOpen: false,
  errorMessage: null,
};

const finishLoading = (state: SettingsState) => {
  state.pendingRequestsCount = Math.max(0, state.pendingRequestsCount - 1);
  state.isGlobalLoading = state.pendingRequestsCount > 0;
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    closeErrorModal: (state) => {
      state.isErrorModalOpen = false;
      state.errorMessage = null;
    },
    openErrorModal: (state, action: PayloadAction<string>) => {
      state.isErrorModalOpen = true;
      state.errorMessage = action.payload;
    },
    resetGlobalLoading: (state) => {
      state.pendingRequestsCount = 0;
      state.isGlobalLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.pendingRequestsCount += 1;
        state.isGlobalLoading = true;
      })
      .addMatcher(isFulfilled, (state) => {
        finishLoading(state);
      })
      .addMatcher(isRejected, (state, action) => {
        finishLoading(state);

        state.isErrorModalOpen = true;

        if (isRejectedWithValue(action) && typeof action.payload === "string") {
          state.errorMessage = action.payload;
        } else {
          state.errorMessage = action.error?.message || "Something went wrong";
        }
      });
  },
});

export const { closeErrorModal, openErrorModal, resetGlobalLoading } =
  settingsSlice.actions;

export default settingsSlice.reducer;

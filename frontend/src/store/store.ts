import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postsReducer from "./slices/postsSlice";
import profileReducer from "./slices/profileSlice";
import commentsReducer from "./slices/commentsSlice";
import settingsReducer from "./slices/settingsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    profile: profileReducer,
    comments: commentsReducer,
    setting: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type TypeDispatch = typeof store.dispatch;

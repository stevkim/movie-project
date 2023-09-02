import { configureStore } from "@reduxjs/toolkit";
import profileReducer from '../src/features/profileSlice';
import searchReducer from '../src/features/searchSlice';
import userReducer from '../src/features/userSlice';
import accountReducer from './features/accountSlice';
import mediaReducer from './features/mediaSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    search: searchReducer,
    userInfo: userReducer,
    account: accountReducer,
    media: mediaReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import type { UserState, CurrentUser } from './user.types';

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    checkUserSession() {},
    googleSignInStart(state) {
      state.isLoading = true;
    },
    emailSignInStart(state, _action) {
      state.isLoading = true;
    },
    signInSuccess(state, action: PayloadAction<CurrentUser>) {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFail(state, action: PayloadAction<Error>) {
      state.isLoading = false;
      state.currentUser = null;
      state.error = action.payload;
    },
    signUpStart(state, _action) {
      state.isLoading = true;
    },
    signUpSuccess(_state, _action) {},
    signUpFail(state, action: PayloadAction<Error>) {
      state.isLoading = false;
      state.currentUser = null;
      state.error = action.payload;
    },
    signOutStart(state) {
      state.isLoading = true;
    },
    signOutSuccess(state) {
      state.isLoading = false;
      state.currentUser = null;
      state.error = null;
    },
    signOutFail(state, action: PayloadAction<Error>) {
      state.isLoading = false;
      state.currentUser = null;
      state.error = action.payload;
    },
  },
});

const userReducer = userSlice.reducer;

export const {
  checkUserSession,
  googleSignInStart,
  emailSignInStart,
  signInSuccess,
  signInFail,
  signUpStart,
  signUpSuccess,
  signUpFail,
  signOutStart,
  signOutSuccess,
  signOutFail,
} = userSlice.actions;

export default userReducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    emailSignInStart(state) {
      state.isLoading = true;
    },
    signInSuccess(state, action) {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFail(state, action) {
      state.isLoading = false;
      state.currentUser = null;
      state.error = action.payload;
    },
    signUpStart(state) {
      state.isLoading = true;
    },
    signUpSuccess() {},
    signUpFail(state, action) {
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
    signOutFail(state, action) {
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

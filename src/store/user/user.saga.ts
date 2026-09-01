import type { PayloadAction } from '@reduxjs/toolkit';

import { all, call, put, takeLatest } from 'typed-redux-saga';

import type { User, AuthError } from 'firebase/auth';

import { AuthErrorCodes } from 'firebase/auth';

import type { AdditionalInfo } from '../../utils/firebase/firebase.types';

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthWithEmailAndPassword,
  createUserAuthWithEmailAndPassword,
  signOutUser,
} from '../../utils/firebase/firebase.utils';

import type { UserSignIn, UserSignUp } from './user.types';

import {
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
} from './user.slice';

function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalDetails?: AdditionalInfo,
) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails,
    );

    if (userSnapshot) {
      yield* put(
        signInSuccess({
          id: userSnapshot.id,
          ...userSnapshot.data(),
          createdAt: userSnapshot.data().createdAt.toDate().toISOString(),
        }),
      );
    }
  } catch (error) {
    yield* put(signInFail(error as Error));
  }
}

function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);

    if (!userAuth) return;

    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFail(error as Error));
  }
}

function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);

    if (!user) return;

    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFail(error as Error));
  }
}

function* signInWithEmail(action: PayloadAction<UserSignIn>) {
  const { email, password } = action.payload;

  try {
    const userCredential = yield* call(
      signInAuthWithEmailAndPassword,
      email,
      password,
    );

    if (!userCredential) return;

    yield* call(getSnapshotFromUserAuth, userCredential.user);
  } catch (error) {
    if ((error as AuthError).code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS)
      alert('Incorrect email and password');

    yield* put(signInFail(error as Error));
  }
}

function* signUp(action: PayloadAction<UserSignUp>) {
  const { email, password, displayName } = action.payload;

  try {
    const userCredential = yield* call(
      createUserAuthWithEmailAndPassword,
      email,
      password,
    );

    if (!userCredential) return;

    yield* put(
      signUpSuccess({
        user: userCredential.user,
        additionalDetails: { displayName },
      }),
    );
  } catch (error) {
    yield* put(signUpFail(error as Error));
  }
}

function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFail(error as Error));
  }
}

function* signInAfterSignUp(
  action: PayloadAction<{ user: User; additionalDetails: AdditionalInfo }>,
) {
  const { user, additionalDetails } = action.payload;

  yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

function* onCheckUserSession() {
  yield* takeLatest(checkUserSession.type, isUserAuthenticated);
}

function* onGoogleSignInStart() {
  yield* takeLatest(googleSignInStart.type, signInWithGoogle);
}

function* onEmailSignInStart() {
  yield* takeLatest(emailSignInStart.type, signInWithEmail);
}

function* onSignUpStart() {
  yield* takeLatest(signUpStart.type, signUp);
}

function* onSignUpSuccess() {
  yield* takeLatest(signUpSuccess.type, signInAfterSignUp);
}

function* onSignOutStart() {
  yield* takeLatest(signOutStart.type, signOut);
}

function* userSaga() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}

export default userSaga;

import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthWithEmailAndPassword,
  createUserAuthWithEmailAndPassword,
  signOutUser,
} from '../../utils/firebase/firebase.utils';

import {
  signInSuccess,
  signInFail,
  signUpSuccess,
  signUpFail,
  signOutSuccess,
  signOutFail,
} from './user.actions';

import USER_ACTION_TYPES from './user.types';

function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails,
    );

    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFail(error));
  }
}

function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);

    if (!userAuth) return;

    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFail(error));
  }
}

function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);

    if (!user) return;

    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFail(error));
  }
}

function* signInWithEmail(action) {
  const { email, password } = action.payload;

  try {
    const { user } = yield call(
      signInAuthWithEmailAndPassword,
      email,
      password,
    );

    if (!user) return;

    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    if (error.code === 'auth/invalid-credential') {
      alert('Incorrect email and password');
    } else {
      yield put(signInFail(error));
    }
  }
}

function* signUp(action) {
  const { email, password, displayName } = action.payload;

  try {
    const { user } = yield call(
      createUserAuthWithEmailAndPassword,
      email,
      password,
    );

    if (!user) return;

    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFail(error));
  }
}

function* signOutStart() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFail(error));
  }
}

function* signInAfterSignUp(action) {
  const { user, additionalDetails } = action.payload;

  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOutStart);
}

function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}

export default userSaga;

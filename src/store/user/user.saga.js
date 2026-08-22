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

function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails,
    );

    yield put(
      signInSuccess({
        id: userSnapshot.id,
        ...userSnapshot.data(),
        createdAt: userSnapshot.data().createdAt.toDate().toISOString(),
      }),
    );
  } catch (error) {
    yield put(signInFail(error.message));
  }
}

function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);

    if (!userAuth) return;

    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFail(error.message));
  }
}

function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);

    if (!user) return;

    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFail(error.message));
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
    if (error.code === 'auth/invalid-credential')
      alert('Incorrect email and password');

    yield put(signInFail(error.message));
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

    yield put(signUpSuccess({ user, additionalDetails: { displayName } }));
  } catch (error) {
    yield put(signUpFail(error.message));
  }
}

function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFail(error.message));
  }
}

function* signInAfterSignUp(action) {
  const { user, additionalDetails } = action.payload;

  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

function* onCheckUserSession() {
  yield takeLatest(checkUserSession.type, isUserAuthenticated);
}

function* onGoogleSignInStart() {
  yield takeLatest(googleSignInStart.type, signInWithGoogle);
}

function* onEmailSignInStart() {
  yield takeLatest(emailSignInStart.type, signInWithEmail);
}

function* onSignUpStart() {
  yield takeLatest(signUpStart.type, signUp);
}

function* onSignUpSuccess() {
  yield takeLatest(signUpSuccess.type, signInAfterSignUp);
}

function* onSignOutStart() {
  yield takeLatest(signOutStart.type, signOut);
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

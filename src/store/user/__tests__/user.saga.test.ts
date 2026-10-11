import type { User } from 'firebase/auth';

import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { AuthErrorCodes } from 'firebase/auth';

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthWithEmailAndPassword,
  createUserAuthWithEmailAndPassword,
  signOutUser,
} from '../../../utils/firebase/firebase.utils';

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
} from '../user.slice';

import userSaga from '../user.saga';

const mockUserAuth = { uid: '123', email: 'teste@teste.com' } as User;
const mockCreatedAt = new Date('2026-10-06');

const mockUserSnapshot = {
  id: '1',
  data: () => ({
    displayName: 'Teste',
    email: mockUserAuth.email!,
    createdAt: { toDate: () => mockCreatedAt },
  }),
};

const mockUser = {
  id: mockUserSnapshot.id,
  ...mockUserSnapshot.data(),
  createdAt: mockUserSnapshot.data().createdAt.toDate().toISOString(),
};

const mockNewUser = {
  displayName: mockUserSnapshot.data().displayName,
  email: mockUserSnapshot.data().email,
  password: '1234',
};

describe('User saga', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not check user authentication and do nothing if current user is not found', () => {
    const mockError = new Error('Authentication error');

    return expectSaga(userSaga)
      .provide([[call(getCurrentUser), undefined]])
      .dispatch(checkUserSession)
      .not.put(signInFail(mockError))
      .silentRun();
  });

  it('should not check user authentication on get user error and dispatch fail', () => {
    const mockError = new Error('Authentication error');

    return expectSaga(userSaga)
      .provide([[call(getCurrentUser), throwError(mockError)]])
      .dispatch(checkUserSession)
      .put(signInFail(mockError))
      .silentRun();
  });

  it('should not check user authentication and do nothing if user snapshot is not found', () => {
    return expectSaga(userSaga)
      .provide([
        [call(getCurrentUser), mockUserAuth],
        [call.fn(createUserDocumentFromAuth), undefined],
      ])
      .dispatch(checkUserSession)
      .not.put.actionType(signInSuccess.type)
      .silentRun();
  });

  it('should not check user authentication on get user snapshot error and dispatch fail', () => {
    const mockError = new Error('Snapshot error');

    return expectSaga(userSaga)
      .provide([
        [call(getCurrentUser), mockUserAuth],
        [call.fn(createUserDocumentFromAuth), throwError(mockError)],
      ])
      .dispatch(checkUserSession)
      .put(signInFail(mockError))
      .silentRun();
  });

  it('should check user authentication and dispatch success', () => {
    return expectSaga(userSaga)
      .provide([
        [call(getCurrentUser), mockUserAuth],
        [call.fn(createUserDocumentFromAuth), mockUserSnapshot],
      ])
      .dispatch(checkUserSession)
      .put(signInSuccess(mockUser))
      .silentRun();
  });

  it('should not sign in with google and do nothing if user not found', () => {
    return expectSaga(userSaga)
      .provide([[call(signInWithGooglePopup), { user: undefined }]])
      .dispatch(googleSignInStart)
      .not.put.actionType(signInSuccess.type)
      .silentRun();
  });

  it('should not sign in with google on error and dispatch fail', () => {
    const mockError = new Error('Google sign in error');

    return expectSaga(userSaga)
      .provide([[call(signInWithGooglePopup), throwError(mockError)]])
      .dispatch(googleSignInStart)
      .put(signInFail(mockError))
      .silentRun();
  });

  it('should sign in with google and dispatch success', () => {
    return expectSaga(userSaga)
      .provide([
        [call(signInWithGooglePopup), { user: mockUserAuth }],
        [call.fn(createUserDocumentFromAuth), mockUserSnapshot],
      ])
      .dispatch(googleSignInStart)
      .put(signInSuccess(mockUser))
      .silentRun();
  });

  it('should not sign in with email and password and do nothing if user not found', () => {
    const { email, password } = { email: 'teste@test.com', password: '1234' };
    const mockUserSignIn = { email, password };

    return expectSaga(userSaga)
      .provide([
        [call(signInAuthWithEmailAndPassword, email, password), undefined],
      ])
      .dispatch(emailSignInStart(mockUserSignIn))
      .not.put.actionType(signInSuccess)
      .silentRun();
  });

  it('should not sign in with email and password when invalid credentials informed, alert about and dispatch fail', () => {
    const { email, password } = { email: 'teste@test.com', password: '1234' };
    const mockUserSignIn = { email, password };
    const mockError = {
      ...new Error('Email sign in error. Invalid credentials.'),
      code: AuthErrorCodes.INVALID_LOGIN_CREDENTIALS,
    };

    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    return expectSaga(userSaga)
      .provide([
        [
          call(signInAuthWithEmailAndPassword, email, password),
          throwError(mockError),
        ],
      ])
      .dispatch(emailSignInStart(mockUserSignIn))
      .put(signInFail(mockError))
      .silentRun()
      .then(() => {
        expect(alertSpy).toHaveBeenCalledWith('Incorrect email and password');
      });
  });

  it('should not sign in with email and password on error, do not alert about and dispatch fail', () => {
    const { email, password } = { email: 'teste@test.com', password: '1234' };
    const mockUserSignIn = { email, password };
    const mockError = new Error('Email sign in error');

    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    return expectSaga(userSaga)
      .provide([
        [
          call(signInAuthWithEmailAndPassword, email, password),
          throwError(mockError),
        ],
      ])
      .dispatch(emailSignInStart(mockUserSignIn))
      .put(signInFail(mockError))
      .silentRun()
      .then(() => {
        expect(alertSpy).not.toHaveBeenCalled();
      });
  });

  it('should sign in with email and password on error and dispatch success', () => {
    const { email, password } = { email: 'teste@test.com', password: '1234' };
    const mockUserSignIn = { email, password };

    return expectSaga(userSaga)
      .provide([
        [
          call(signInAuthWithEmailAndPassword, email, password),
          { user: mockUserAuth },
        ],
        [call.fn(createUserDocumentFromAuth), mockUserSnapshot],
      ])
      .dispatch(emailSignInStart(mockUserSignIn))
      .put(signInSuccess(mockUser))
      .silentRun();
  });

  it('should not sign up and do nothing if new user authentication credential is not created', () => {
    return expectSaga(userSaga)
      .provide([[call.fn(createUserAuthWithEmailAndPassword), undefined]])
      .dispatch(signUpStart(mockNewUser))
      .not.put.actionType(signUpSuccess.type)
      .silentRun();
  });

  it('should not sign up new user authentication credential when email already in use, alert about and dispatch fail', () => {
    const mockError = {
      ...new Error('Sign up error. Email already in use.'),
      code: AuthErrorCodes.EMAIL_EXISTS,
    };

    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    return expectSaga(userSaga)
      .provide([
        [call.fn(createUserAuthWithEmailAndPassword), throwError(mockError)],
      ])
      .dispatch(signUpStart(mockNewUser))
      .put(signUpFail(mockError))
      .silentRun()
      .then(() => {
        expect(alertSpy).toHaveBeenCalledWith(
          'Cannot sign up, email already in use.',
        );
      });
  });

  it('should not sign up new user authentication credential on erro, do not alert about and dispatch fail', () => {
    const mockError = new Error('Sign up error');

    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    return expectSaga(userSaga)
      .provide([
        [call.fn(createUserAuthWithEmailAndPassword), throwError(mockError)],
      ])
      .dispatch(signUpStart(mockNewUser))
      .put(signUpFail(mockError))
      .silentRun()
      .then(() => {
        expect(alertSpy).not.toHaveBeenCalled();
      });
  });

  it('should sign up new user authentication credential and dispatch success and sign in with success', () => {
    const mockSignUp = {
      user: mockUserAuth,
      additionalDetails: { displayName: mockNewUser.displayName },
    };

    return expectSaga(userSaga)
      .provide([
        [call.fn(createUserAuthWithEmailAndPassword), { user: mockUserAuth }],
        [call.fn(createUserDocumentFromAuth), mockUserSnapshot],
      ])
      .dispatch(signUpStart(mockNewUser))
      .put(signUpSuccess(mockSignUp))
      .put(signInSuccess(mockUser))
      .silentRun();
  });

  it('should not sign out on error and dispatch fail', () => {
    const mockError = new Error('Sign out error');

    return expectSaga(userSaga)
      .provide([[call(signOutUser), throwError(mockError)]])
      .dispatch(signOutStart)
      .put(signOutFail(mockError))
      .silentRun();
  });

  it('should sign out and dispatch success', () => {
    return expectSaga(userSaga)
      .dispatch(signOutStart)
      .put(signOutSuccess())
      .silentRun();
  });
});

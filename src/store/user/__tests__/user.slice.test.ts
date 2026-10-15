import type { User } from 'firebase/auth';

import {
  initialState,
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

import userReducer from '../user.slice';

describe('User slice', () => {
  it('should do nothing when checkUserSession is called', () => {
    const newState = userReducer(initialState, checkUserSession());
    expect(newState).toEqual(initialState);
  });

  it('should set isLoading true when googleSignInStart is called', () => {
    const newState = userReducer(initialState, googleSignInStart());
    const expectedState = { ...initialState, isLoading: true };
    expect(newState).toEqual(expectedState);
  });

  it('should set isLoading true when emailSignInStart is called', () => {
    const mockUserData = {
      email: 'teste@teste.com',
      password: 'teste',
    };

    const newState = userReducer(initialState, emailSignInStart(mockUserData));
    const expectedState = { ...initialState, isLoading: true };
    expect(newState).toEqual(expectedState);
  });

  it('should set current user when signInSuccess is called', () => {
    const mockUser = {
      id: '1',
      createdAt: Date.now().toString(),
      displayName: 'Teste',
      email: 'teste@teste.com',
    };

    const newState = userReducer(initialState, signInSuccess(mockUser));
    const expectedState = { ...initialState, currentUser: mockUser };
    expect(newState).toEqual(expectedState);
  });

  it('should set error value when signInFail is called', () => {
    const mockError = new Error('Error sign in');

    const newState = userReducer(initialState, signInFail(mockError));
    const expectedState = { ...initialState, error: mockError };
    expect(newState).toEqual(expectedState);
  });

  it('should set isLoading true when signUpStart is called', () => {
    const mockNewUserData = {
      email: 'teste@teste.com',
      password: 'teste',
      displayName: 'teste',
    };

    const newState = userReducer(initialState, signUpStart(mockNewUserData));
    const expectedState = { ...initialState, isLoading: true };
    expect(newState).toEqual(expectedState);
  });

  it('should do nothing when signUpSuccess is called', () => {
    const mockUser = {
      uid: '1',
      email: 'teste@teste.com',
    } as User;

    const mockAdditionalDetails = {
      displayName: 'Teste',
    };

    const newState = userReducer(
      initialState,
      signUpSuccess({
        user: mockUser,
        additionalDetails: mockAdditionalDetails,
      }),
    );
    expect(newState).toEqual(initialState);
  });

  it('should set error value when signUpFail is called', () => {
    const mockError = new Error('Error sign up');

    const newState = userReducer(initialState, signUpFail(mockError));
    const expectedState = { ...initialState, error: mockError };
    expect(newState).toEqual(expectedState);
  });

  it('should set isLoading true when signOutStart is called', () => {
    const newState = userReducer(initialState, signOutStart());
    const expectedState = { ...initialState, isLoading: true };
    expect(newState).toEqual(expectedState);
  });

  it('should unset current user when signOutSuccess is called', () => {
    const mockUser = {
      id: '1',
      createdAt: Date.now().toString(),
      displayName: 'Teste',
      email: 'teste@teste.com',
    };

    const newState = userReducer(
      { ...initialState, currentUser: mockUser },
      signOutSuccess(),
    );

    const expectedState = initialState;
    expect(newState).toEqual(expectedState);
  });

  it('should set error value when signOutFail is called', () => {
    const mockUser = {
      id: '1',
      createdAt: Date.now().toString(),
      displayName: 'Teste',
      email: 'teste@teste.com',
    };

    const mockError = new Error('Error sign out');

    const newState = userReducer(
      { ...initialState, currentUser: mockUser },
      signOutFail(mockError),
    );

    const expectedState = {
      ...initialState,
      currentUser: mockUser,
      error: mockError,
    };

    expect(newState).toEqual(expectedState);
  });
});

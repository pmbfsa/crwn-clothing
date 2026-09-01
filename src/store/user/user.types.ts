export type CurrentUser = {
  id: string;
  createdAt: string;
  displayName: string;
  email: string;
};

export type UserState = {
  readonly currentUser: CurrentUser | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export type UserSignIn = { email: string; password: string };

export type UserSignUp = UserSignIn & { displayName: string };

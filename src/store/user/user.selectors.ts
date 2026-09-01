import { createSelector } from 'reselect';

import type { PersistedRootState } from '../store';

const selectUserSlice = (state: PersistedRootState) => state.user;

export const selectCurrentUser = createSelector(
  [selectUserSlice],
  (userSlice) => userSlice.currentUser,
);

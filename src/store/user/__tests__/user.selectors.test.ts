import type { PersistedRootState } from '../../store';

import { initialState } from '../user.slice';

import { selectCurrentUser } from '../user.selectors';

const mockState = { user: { ...initialState } } as PersistedRootState;

describe('User selectors', () => {
  it('should return current user for selectCurrentUser', () => {
    const currentUser = selectCurrentUser(mockState);
    expect(currentUser).toEqual(mockState.user.currentUser);
  });
});

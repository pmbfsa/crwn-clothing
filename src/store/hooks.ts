import { useDispatch, useSelector } from 'react-redux';

import type { PersistedRootState, AppDispatch } from './store';

export const useAppSelector = useSelector.withTypes<PersistedRootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

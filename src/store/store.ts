import { configureStore } from '@reduxjs/toolkit';

import type { PersistConfig } from 'redux-persist';

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import createSagaMiddleware from 'redux-saga';

import type { RootState } from './root-reducer';

import { signUpSuccess } from './user/user.slice';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

// redux-persist configuration
export const storage = {
  getItem: (key: string) => Promise.resolve(window.localStorage.getItem(key)),
  setItem: (key: string, value: string) =>
    Promise.resolve(window.localStorage.setItem(key, value)),
  removeItem: (key: string) =>
    Promise.resolve(window.localStorage.removeItem(key)),
};

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

// store configuration
export function setupStore(testing = false, preloadedState?: PreloadedState) {
  const store = testing
    ? configureStore({
        reducer: rootReducer,
        preloadedState,
      })
    : configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => {
          const middleware = getDefaultMiddleware({
            serializableCheck: {
              ignoredActions: [
                FLUSH,
                REHYDRATE,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER,
                signUpSuccess.type,
              ],
            },
          }).concat(sagaMiddleware);

          return middleware;
        },
      });
  return store;
}

export const store = setupStore();
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

// hooks types
export type PersistedRootState = ReturnType<typeof persistedReducer>;
export type AppDispatch = typeof store.dispatch;

// test utils types
export type PreloadedState = Parameters<typeof rootReducer>[0];
export type AppStore = typeof store;

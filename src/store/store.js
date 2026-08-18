import { compose, createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

import rootReducer from './root-reducer';

const storage = {
  getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
  setItem: (key, value) =>
    Promise.resolve(window.localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(window.localStorage.removeItem(key)),
};

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [];

if (import.meta.env.DEV) {
  const { createLogger } = await import('redux-logger');
  middlewares.push(createLogger());
}

const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers,
);

export const persistor = persistStore(store);

import type { PropsWithChildren } from 'react';
import type { RenderOptions } from '@testing-library/react';
import type { AppStore, PreloadedState } from '../../store/store';

import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';

import { setupStore } from '../../store/store';

interface ExtendedRenderOptions extends Omit<
  RenderOptions,
  'queries' | 'wrapper'
> {
  preloadedState?: PreloadedState;
  store?: AppStore;
  route?: string;
}

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
) {
  const {
    preloadedState = {},
    store = setupStore(true, preloadedState),
    route = '/',
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <MemoryRouter initialEntries={[route]}>
      <Provider store={store}>{children}</Provider>
    </MemoryRouter>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

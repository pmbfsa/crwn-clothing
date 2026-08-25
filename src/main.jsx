import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Elements } from '@stripe/react-stripe-js';

import App from './App.jsx';

import { store, persistor } from './store/store.js';
import { stripePromise } from './utils/stripe/stripe.utils.js';

import './index.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);

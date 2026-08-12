import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import './index.scss';
import App from './App.jsx';
import UserProvider from './providers/user.provider.jsx';
import CategoriesProvider from './providers/categories.provider.jsx';
import CartProvider from './providers/cart.provider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <UserProvider>
        <CategoriesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CategoriesProvider>
      </UserProvider>
    </HashRouter>
  </StrictMode>,
);

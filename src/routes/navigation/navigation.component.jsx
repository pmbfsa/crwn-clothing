import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import CartIcon from '../../components/cart-icon/cart-icon.component.jsx';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component.jsx';

import CrwnLogo from '../../assets/crown.svg?react';

import UserContext from '../../contexts/user.context.jsx';
import CartContext from '../../contexts/cart.context.jsx';

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from './navigation.styles.jsx';

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  const signOutHandle = async () => {
    await signOutUser();
    setCurrentUser(null);
  };

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutHandle}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

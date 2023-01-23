import { Fragment, useContext } from "react"; //component that renders to nothing. the point of using is bc of react's rules where a component has to have a parent element. useful if you dont want to render a specific html element.

import { Outlet } from "react-router-dom";
//Outlet component allows nested routes to render their element content out and anything else the layout route is rendering.
// used in parent route elements to render their child route elements

import { useSelector } from "react-redux";
// useSelector is a hook that allows us to interact from a component with the redux store

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { CartContext } from "../../contexts/cart.context";

import { selectCurrentUser } from "../../store/user/user.selector";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
} from "./navigation.styles";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  // the context lets us store our user but also tracks the authentication of that user
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer className="navigation">
        <LogoContainer to="/">
          <CrownLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>

        {isCartOpen && <CartDropdown />}
        {/* all components are truthy by default, so with &&, both have to evaluate to true to load */}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

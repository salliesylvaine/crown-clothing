import { Fragment, useContext } from "react"; //component that renders to nothing. the point of using is bc of react's rules where a component has to have a parent element. useful if you dont want to render a specific html element.

import { Outlet, Link } from "react-router-dom";
//Outlet component allows nested routes to render their element content out and anything else the layout route is rendering.
// used in parent route elements to render their child route elements

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";

import { UserContext } from "../../contexts/user.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  // the context lets us store our user but also tracks the authentication of that user

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

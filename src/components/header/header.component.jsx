import React from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import { auth } from "./../../firebase/firebase.utils";
import { ReactComponent as Logo } from "./../../assets/crown.svg"; //This is a new special syntax when importing SVG in React. The ReactComponent import name is special and tells Create React App that you want a React component that renders an SVG, rather than its filenameUsing logo component by define this
const Header = ({ currentUser }) => {
  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/contact">
          CONTACT
        </Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut(currentUser)}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/registration">
            SIGN IN
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;

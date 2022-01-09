import React from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import { auth } from "./../../firebase/firebase.utils";
import { connect } from "react-redux";
import { ReactComponent as Logo } from "./../../assets/crown.svg"; //This is a new special syntax when importing SVG in React. The ReactComponent import name is special and tells Create React App that you want a React component that renders an SVG, rather than its filenameUsing logo component by define this

const Header = (currentUser) => {
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
//mapStateToProps takes state(comes from root reducer) as parameter and set prop based on it
const mapStateToProps = (state) => {
  return { currentUser: state.user.currentUser };
};
//We have to connect Prop to the Component which receive state as prop, initially we pass state as prop to Header in App.js, but with redux, we don't pass anything as prop in parent component, we directly connect in child component
export default connect(mapStateToProps)(Header);

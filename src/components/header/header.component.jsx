import React from "react";
//styles
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from "./header.styles.jsx";
import { auth } from "./../../firebase/firebase.utils";
import { connect } from "react-redux";
import CartIcon from "./../cart-icon/cart-icon.component";
import { ReactComponent as Logo } from "./../../assets/crown.svg"; //This is a new special syntax when importing SVG in React. The ReactComponent import name is special and tells Create React App that you want a React component that renders an SVG, rather than its filenameUsing logo component by define this
import CartDropdown from "./../cart-dropdown/cart-dropdown.component";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "./../../redux/cart/cart.selector";
import { selectCurrentUser } from "./../../redux/user/user.selector";

const Header = ({ currentUser, cartToggleHidden }) => {
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to="/shop">SHOP</OptionLink>
        <OptionLink to="/contact">CONTACT</OptionLink>
        {currentUser ? (
          <OptionLink as="div" onClick={() => auth.signOut(currentUser)}>
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink to="/signin">SIGN IN</OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
      {cartToggleHidden ? "" : <CartDropdown />}
    </HeaderContainer>
  );
};
//mapStateToProps takes state(comes from root reducer) as parameter and set prop based on it
const mapStateToProps = createStructuredSelector({
  //If we don't want to repeat state, we can use createStructuredSelector, it will automatically pass our top level state to selector functions
  currentUser: selectCurrentUser,
  cartToggleHidden: selectCartHidden,
});

//We have to connect Prop to the Component which receive state as prop, initially we pass state as prop to Header in App.js, but with redux, we don't pass anything as prop in parent component, we directly connect in child component
export default connect(mapStateToProps)(Header);

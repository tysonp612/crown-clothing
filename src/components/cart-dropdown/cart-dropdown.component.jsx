import "./cart-dropdown.styles.scss";
import React from "react";
import CustomButton from "./../custom-button/custom-button.component";

//extract cartToggleHidden as prop from this.props.cartToggleHidden as parameter, this will return true or false based on the state
const CartDropdown = ({ cartToggleHidden }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items"></div>
      <CustomButton>GO TO CHECK OUT</CustomButton>
    </div>
  );
};

export default CartDropdown;

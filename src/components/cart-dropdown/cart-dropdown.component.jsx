import "./cart-dropdown.styles.scss";
import React from "react";
import CustomButton from "./../custom-button/custom-button.component";
import CartItem from "./../cart-item/cart-item.component";
import { connect } from "react-redux";
import { selectCartItems } from "./../../redux/cart/cart.selector";
const CartDropdown = ({ items }) => {
  console.log(items);
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {items.map((item) => (
          //when pass data as prop,use format item={item}
          <CartItem key={item.id} item={item}></CartItem>
        ))}
      </div>

      <CustomButton>GO TO CHECK OUT</CustomButton>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { items: selectCartItems(state) };
};
export default connect(mapStateToProps)(CartDropdown);

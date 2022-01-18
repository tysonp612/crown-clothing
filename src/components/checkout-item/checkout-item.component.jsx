import React from "react";
import "./checkout-item.styles.scss";
import { createStructuredSelector } from "reselect";
import { removeItem } from "./../../redux/cart/cart.actions";
import { addItemsToCart } from "./../../redux/cart/cart.actions";
import { connect } from "react-redux";
import { clearItemFromCart } from "./../../redux/cart/cart.actions";

const CheckoutItem = ({ cartItem, clearItem, removeItem, addItems }) => {
  const { name, price, quantity, imageUrl } = cartItem;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => removeItem(cartItem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItems(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="price">${price}</span>
      <span className="remove-button" onClick={() => clearItem(cartItem)}>
        &#10005;
      </span>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  //always need to return in mapDispatchToProps
  return {
    clearItem: (item) => dispatch(clearItemFromCart(item)),
    removeItem: (item) => dispatch(removeItem(item)),
    addItems: (item) => dispatch(addItemsToCart(item)),
  };
};

export default connect(null, mapDispatchToProps)(CheckoutItem);

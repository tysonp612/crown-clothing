import "./cart-dropdown.styles.scss";
import React from "react";
import CustomButton from "./../custom-button/custom-button.component";
import CartItem from "./../cart-item/cart-item.component";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "./../../redux/cart/cart.selector";
import { createStructuredSelector } from "reselect";
import { useParams, useHistory } from "react-router-dom";
import { toggleCartDropDown } from "./../../redux/cart/cart.actions";
//if we don't want to set up map dispatch to props, an easier way is to pass "dispatch" in the parameter
const CartDropdown = () => {
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {items.length ? (
          items.map((item) => (
            //when pass data as prop,use format item={item}
            <CartItem key={item.id} item={item}></CartItem>
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      {/* as we use withRouter and we have assess to history, we use to button as we click to go to /checkout with the history of previous cartItem information */}
      <CustomButton
        onClick={() => {
          history.push("/checkout");
          //after passing dispatch in parameter, use dispatch(function) to use the function as a shortcut
          dispatch(toggleCartDropDown());
        }}
      >
        GO TO CHECK OUT
      </CustomButton>
    </div>
  );
};

// const mapStateToProps = createStructuredSelector({
//   items: selectCartItems,
// });
//using withRouter as higher function that take another function as parameter, we can have assess from history prop, and cartItems
export default CartDropdown;

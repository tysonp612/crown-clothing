import { react } from "react";
import { ReactComponent as ShoppingIcon } from "./../../assets/shopping-bag.svg";
import { toggleCartDropDown } from "./../../redux/cart/cart.actions";
import { selectCartItemsCount } from "./../../redux/cart/cart.selector";
import { createStructuredSelector } from "reselect";
import "./cart-icon.styles.scss";
import { connect } from "react-redux";
const CartIcon = ({ toggleCartDropDown, itemCount }) => {
  return (
    //we use dispatch(function) in the component that we click to (cart-icon) to change the state to hidden:false
    <div className="cart-icon" onClick={toggleCartDropDown}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    //import the action from cart/actions to match the type, we don't need payload on this one
    toggleCartDropDown: () => dispatch(toggleCartDropDown()),
  };
};
const mapStateToProps = createStructuredSelector({
  //use reduce to calculate total quantity in cart, this will accumulate every cartItem.quantity from 0
  //passing all the state in selector function, selector function then take the whole state and break it into smaller input selector
  itemCount: selectCartItemsCount,
});
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);

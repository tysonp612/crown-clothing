import { react } from "react";
import { ReactComponent as ShoppingIcon } from "./../../assets/shopping-bag.svg";
import { toggleCartDropDown } from "./../../redux/cart/cart.actions";
import "./cart-icon.styles.scss";
import { connect } from "react-redux";
const CartIcon = ({ toggleCartDropDown }) => {
  return (
    //we use dispatch(function) in the component that we click to (cart-icon) to change the state to hidden:false
    <div className="cart-icon" onClick={toggleCartDropDown}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    //import the action from cart/actions to match the type, we don't need payload on this one
    toggleCartDropDown: () => dispatch(toggleCartDropDown()),
  };
};
export default connect(null, mapDispatchToProps)(CartIcon);

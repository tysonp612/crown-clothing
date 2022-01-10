import "./cart-dropdown.styles.scss";
import React from "react";
import CustomButton from "./../custom-button/custom-button.component";
import { connect } from "react-redux";

//extract cartToggleHidden as prop from this.props.cartToggleHidden as parameter, this will return true or false based on the state
const CartDropdown = ({ cartToggleHidden }) => {
  return (
    <div className={`cart-dropdown ${cartToggleHidden ? "hidden" : ""}`}>
      <div className="cart-items"></div>
      <CustomButton>GO TO CHECK OUT</CustomButton>
    </div>
  );
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     toggleCartDropDown: () => dispatch(toggleCartDropDown()),
//   };
// };
const mapStateToProps = (state) => {
  //we get the state from root reducer
  return { cartToggleHidden: state.cartToggleHidden.hidden };
};
export default connect(mapStateToProps)(CartDropdown);

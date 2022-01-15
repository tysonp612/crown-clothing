import { createSelector } from "reselect";
//After we pass state as parameter into selector function in cart-icon component, it will go to the first input selector
//ALWAYS RETURN TO USE SELECTOR
const selectUser = (state) => {
  //Input selector,return 1 layer deep from state redux\
  //1st input selector will return a deeper layer to state.cart
  return state.user;
};

export const selectCurrentUser = createSelector(
  //create Selector based on input selector and use it  as parameter,output a function to return cart.cartItem
  [selectUser],
  (user) => {
    //using state.cart as input for the 2nd selector, it will return a deeper layer to cart.cartItems (ARRAY IN CART REDUCER)
    return user.currentUser;
  }
  //because we use input selector to create the output selector, we need to     +
);

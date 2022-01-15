import { createSelector } from "reselect";
//After we pass state as parameter into selector function in cart-icon component, it will go to the first input selector
//ALWAYS RETURN TO USE SELECTOR
const selectCart = (state) => {
  //Input selector,return 1 layer deep from state redux\
  //1st input selector will return a deeper layer to state.cart
  return state.cart;
};

export const selectCartItems = createSelector(
  //create Selector based on input selector and use it  as parameter,output a function to return cart.cartItem
  [selectCart],
  (cart) => {
    //using state.cart as input for the 2nd selector, it will return a deeper layer to cart.cartItems (ARRAY IN CART REDUCER)
    return cart.cartItems;
  }
  //because we use input selector to create the output selector, we need to     +
);
export const selectCartHidden = createSelector([selectCart], (cart) => {
  return cart.hidden;
});
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) => {
    //USING cartItems (ARRAY) will return the main function, which is to reduce to get the total quantity, we do this so that application wont render again if the state doesn't change'
    return cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity,
      0
    );
  }
);

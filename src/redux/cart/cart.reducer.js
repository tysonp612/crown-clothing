import { CartActionTypes } from "./cart.types";
import { addMutipleItemsToCart } from "./cart.utils";
const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_DROP_DOWN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case CartActionTypes.ADD_ITEMS_TO_CART:
      return {
        ...state,
        //we can use function in reducer to check condition
        cartItems: addMutipleItemsToCart(state.cartItems, action.payload),
      };
    default:
      return state;
  }
};
export default cartReducer;

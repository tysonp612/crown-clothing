import { CartActionTypes } from "./cart.types";
import { addMutipleItemsToCart } from "./cart.utils";
import { removeItemFromCart } from "./cart.utils";
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
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        //filter the cartitem that does not match the payload id and keep that array, the item that matches with payload id will be filtered
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ),
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    default:
      return state;
  }
};
export default cartReducer;

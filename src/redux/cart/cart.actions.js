import { CartActionTypes } from "./cart.types";

export const toggleCartDropDown = () => {
  return { type: CartActionTypes.TOGGLE_CART_DROP_DOWN };
};

export const addItemsToCart = (item) => {
  return { type: CartActionTypes.ADD_ITEMS_TO_CART, payload: item };
};

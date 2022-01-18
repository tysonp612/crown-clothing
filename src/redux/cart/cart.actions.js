import { CartActionTypes } from "./cart.types";

export const toggleCartDropDown = () => {
  return { type: CartActionTypes.TOGGLE_CART_DROP_DOWN };
};

export const addItemsToCart = (item) => {
  return { type: CartActionTypes.ADD_ITEMS_TO_CART, payload: item };
};
export const clearItemFromCart = (item) => {
  return { type: CartActionTypes.CLEAR_ITEM_FROM_CART, payload: item };
};
export const removeItem = (item) => {
  return { type: CartActionTypes.REMOVE_ITEM, payload: item };
};

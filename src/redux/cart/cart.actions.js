import { CartActionTypes } from "./cart.types";

const toggleCartDropDown = () => {
  return { type: CartActionTypes.TOGGLE_CART_DROP_DOWN };
};
export default toggleCartDropDown;

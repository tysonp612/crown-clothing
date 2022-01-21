import { ShopActionTypes } from "./shop.types";
import SHOP_DATA from "./shop.data";
const INITIAL_STATE = {
  collections: SHOP_DATA,
  params: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.CHANGE_PARAMS:
      return { ...state, params: action.payload };
    default:
      return state;
  }
};

export default shopReducer;

import { ShopActionTypes } from "./shop.types";

export const changeShopParams = (item) => {
  return {
    type: ShopActionTypes.CHANGE_PARAMS,
    payload: item,
  };
};

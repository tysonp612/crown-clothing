import { ShopActionTypes } from "./shop.types";

// export const changeShopParams = (item) => {
//   return {
//     type: ShopActionTypes.CHANGE_PARAMS,
//     payload: item,
//   };
// };

export const updateCollections = (collectionsMap) => {
  return {
    type: ShopActionTypes.UPDATE_COLLECTIONS,
    payload: collectionsMap,
  };
};

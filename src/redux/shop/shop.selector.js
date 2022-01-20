import { createSelector } from "reselect";
const selectShop = (state) => state.shop;

export const selectShopItems = createSelector(
  [selectShop],
  (shop) => shop.collections
);

//This meaning that we pass a parameter in the selector, from the return collections (state.shopData)(ARRAY OF SHOP ITEMS),we find the item wich matches the routename with the paramater passed in
export const selectCollection = (collectionUrlParam) => {
  createSelector([selectShopItems], (collections) => {
    collections.find(
      (collection) => collection.routeName === collectionUrlParam
    );
  });
};

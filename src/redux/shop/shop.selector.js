import { createSelector } from "reselect";
const COLLECTION_ID_MAP = {
  hats: 1,
  sneakers: 2,
  jackets: 3,
  womens: 4,
  mens: 5,
};

const selectShop = (state) => state.shop;

export const selectShopItems = createSelector(
  [selectShop],
  (shop) => shop.collections
);

//This meaning that we pass a parameter in the selector, from the return collections (state.shopData)(ARRAY OF SHOP ITEMS),we find the item wich matches the routename with the paramater passed
export const selectCollection = (collectionUrlParam) => {
  return createSelector([selectShopItems], (collections) => {
    return collections.find(
      (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
    );
  });
};

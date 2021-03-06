import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectShopItems = createSelector(
  [selectShop],
  (shop) => shop.collections
);
//Change from object to array
//This means we make an array based on the key of the collection to make a new array with key: Array[key,key...]
//Then we map through those keys to make an new array with the value of those keys in the begining object Array[{value of key 1},{value of key 2},{value of key 3}]
export const selectCollectionsForPreview = createSelector(
  [selectShopItems],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

//This meaning that we pass a parameter in the selector, from the return collections (state.shopData)(ARRAY OF SHOP ITEMS),we find the item wich matches the routename with the paramater passed
export const selectCollection = (collectionUrlParam) => {
  return createSelector([selectShopItems], (collections) => {
    return collections ? collections[collectionUrlParam] : null;
  });
};

// Because render gets called first before data is fetched, so CollectionPage will get error getting title of null, so we make a new selector to check if there is any collection in shop.collections and return a boolean value, if no collection exists, it will render spinner
export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  //short hand to convert a value into boolean (true or false)
  (shop) => !!shop.collections
);

//ASYNCHRONOUS REDUX HANDLE

export const selectCollectionFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

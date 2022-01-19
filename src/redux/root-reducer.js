import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // saying that we want the default storage to be local storage
//JSON object represent any possible configuration that persist can use
const persistConfig = {
  key: "root",
  storage,
  //whitelist is an array containing the string names of any of the reducer that we want to store
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  //Root Reducer is basically the STATE, or a piece of data that the store is made of, When mapStateToProp, state is root reducer
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
});

export default persistReducer(persistConfig, rootReducer);

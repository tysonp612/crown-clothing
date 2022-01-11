import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
const rootReducer = combineReducers({
  //Root Reducer is basically the STATE, or a piece of data that the store is made of, When mapStateToProp, state is root reducer
  user: userReducer,
  cart: cartReducer,
});

export default rootReducer;

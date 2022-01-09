import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";

const rootReducer = combineReducers({
  //Root Reducer is basically the STATE, or a piece of data that the store is made of, When mapStateToProp, state is root reducer
  user: userReducer,
});

export default rootReducer;

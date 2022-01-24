import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import rootReducer from "./../root-reducer";

const middlewares = []; //making an array of logger methods for each
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}
const store = createStore(rootReducer, applyMiddleware(...middlewares)); //this will spread all the method, all the value in the array into the function call as individual arguments
const persistor = persistStore(store);
const test = " Adding nrew branch for css style";
export { store, persistor };

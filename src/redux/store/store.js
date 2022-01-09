import { createStore, applyMiddleware } from "redux";

import logger from "redux-logger";
import rootReducer from "./../root-reducer";

const middlewares = [logger]; //making an array of logger methods for each
const store = createStore(rootReducer, applyMiddleware(...middlewares)); //this will spread all the method, all the value in the array into the function call as individual arguments

export default store;

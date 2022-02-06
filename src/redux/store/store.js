import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import rootReducer from "./../root-reducer";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./../root-saga";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware]; //making an array of logger methods for each
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}
const store = createStore(rootReducer, applyMiddleware(...middlewares)); //this will spread all the method, all the value in the array into the function call as individual arguments
sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);

export { store, persistor };

import { ShopActionTypes } from "./shop.types";
const INITIAL_STATE = {
  // collections: SHOP_DATA,
  collections: null,
  isFetching: false,
  errorMessage: undefined,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case ShopActionTypes.CHANGE_PARAMS:
    //   return { ...state, params: action.payload };

    //MAKING ASYNCHRONOUS REDUX HANDLE
    //2, After changing in actions type, make isFetching : false
    //3 When the actions START, return isFetching = true
    case ShopActionTypes.FETCH_COLLECTIONS_STARTS:
      return {
        ...state,
        isFetching: true,
      };
    //4 This has a payload === data because we will pass the data into this mapDispatchToProps (data)
    //then changing isFetching = false
    case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        collections: action.payload,
      };
    //5 In case there is error, we make a state called errorMessage and when there is an error, pass the error message in to the payload
    case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    // case ShopActionTypes.UPDATE_COLLECTIONS:
    //   return { ...state, collections: action.payload };
    default:
      return state;
  }
};

export default shopReducer;

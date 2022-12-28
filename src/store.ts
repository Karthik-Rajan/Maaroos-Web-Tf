import { combineReducers, createStore, compose } from "redux";

import vendorReducer from "./reducers/vendor";
import userReducer from "./reducers/user";
import commonReducer from "./reducers/common";
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  vendor: vendorReducer,
  user: userReducer,
  common: commonReducer,
});

const store = createStore(rootReducer);
export default store;

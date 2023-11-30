import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers } from "redux";
import authReducer from "./Reducers/authRedcuer";
import profileReducer from "./Reducers/profileReducer";
import agencyReducer from "./Reducers/agencyReducer";

const store = createStore(
  combineReducers({
    auth: authReducer,
    profile: profileReducer,
    agencies: agencyReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

import { combineReducers } from "redux";

import authReducer, { AUTH_REDUCER } from "src/entities/auth/model/reducer";

export const rootReducer = combineReducers({
  [AUTH_REDUCER]: authReducer,
});

import { AUTH_DATA, AUTH_TYPE } from "src/entities/auth/model/types";

export const AUTH_REDUCER = "AUTH_REDUCER";

type authState = {
  isAuth: boolean;
  error: boolean;
};

const initState: authState = {
  isAuth: false,
  error: false,
};

export function authReducer(state: authState = initState, action: AUTH_DATA) {
  switch (action.type) {
    case AUTH_TYPE.AUTH_SUCCESS:
      return { ...state, isAuth: action.isAuthenticated, error: false };
    case AUTH_TYPE.AUTH_ERROR:
      return { ...state, isAuth: false, error: true };
    default:
      return state;
  }
}

export default authReducer;

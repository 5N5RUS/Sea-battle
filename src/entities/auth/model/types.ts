export enum AUTH_TYPE {
  AUTH_ERROR = "AUTH/ERROR",
  AUTH_SUCCESS = "AUTH/SUCCESS",
}

export type AUTH_DATA = {
  type: AUTH_TYPE;
  isAuthenticated: boolean;
};

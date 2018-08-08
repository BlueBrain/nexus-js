import * as types from "./types";

const defaultState = {
  token: null,
  tokenOwner: null,
  tokenExpiration: null
}
/*
  reducerKey allows you to make unique places in the redux state
  object where the actions for this will be assigned so as not
  to overlap other search instances
*/
export default (reducerKey = "") => (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case reducerKey + types.LOGIN:
      let { token, tokenOwner, tokenExpiration } = action.payload;
      return Object.assign({}, state, {
        token,
        tokenOwner,
        tokenExpiration
      });
    case reducerKey + types.LOGOUT:
      return Object.assign({}, state, {
        token: null,
        tokenOwner: null,
        tokenExpiration: null
      });
    default:
      return state;
  }
};

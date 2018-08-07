import { getLoginObjectFromURL } from '../../../libs/url';
import * as types from "./types";

const createAuthenticate = typeActions => currentLocation => {
  if (!currentLocation) { console.error('missing required property "currentLocation" for authenticate action'); }
  return (dispatch, getState) => {
    const loginObject = getLoginObjectFromURL(currentLocation);
    const now = Date.now()/1000; //toz get in seconds
    const { tokenExpiration } = getState().auth
    const isValidToken = Number.isFinite(tokenExpiration) && now < tokenExpiration;
    // The token in state is good already
    if (isValidToken) {
      return
    }
    // The token expired, so logout
    if (Number.isFinite(tokenExpiration) && !isValidToken) {
      return dispatch(typeActions.logout({ reason: "expired" }))
    }
    // Our current token is bad or doesnt exist, but we have just been redirected
    // with the query parameter token so that we can log in
    if (loginObject.token) {
      return dispatch(typeActions.login(loginObject));
    }
    // somehow there is no token, so logout
    return dispatch(typeActions.logout({ reason: "invalid" }));
  }
}

// TODO it might be silly to have reducerKey functionality here as there is
// likely not to have multiple users in a session..
const createLogout = reducerKey => ({ reason }) => {
  return {
    type: reducerKey + types.LOGOUT,
    payload: { reason }
  };
};

const createLogin = reducerKey => ({ token, tokenOwner, tokenExpiration }) => {
  return {
    type: reducerKey + types.LOGIN,
    payload: { token, tokenOwner, tokenExpiration }
  };
};

export default (reducerKey, ) => {
  const typeActions = {
    logout: createLogout(reducerKey),
    login: createLogin(reducerKey),
  };
  return {
    authenticate: createAuthenticate(typeActions),
    ...typeActions
  };
};

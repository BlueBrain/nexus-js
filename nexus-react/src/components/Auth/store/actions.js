import { removeTokenFromUrl } from '../../../libs/url';
import * as types from "./types";

const getLoginObjectFromURL = URL => {
  try {
    // Token in JWT format
    const token = removeTokenFromUrl(URL);
    if (!token) { return {} }

    // JWT structure is "base64url(header) . base64url(payload) . base64url(signature)"
    const [, payload, ] = token.split('.');

    // Convert payload from base64url to plain base64.
    // Only 2 characters differ.
    const payloadBase64 = payload.replace(/-/g, '+').replace(/_/g, '/');

    // Go through URL decoding to properly parse UTF-8 data.
    // @see https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
    const { name, exp } = JSON.parse(decodeURIComponent(escape(atob(payloadBase64))));
    return { token, tokenExpiration: exp, tokenOwner: name }
  } catch (e) {
    console.error(e);
    return {}
  }
}

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

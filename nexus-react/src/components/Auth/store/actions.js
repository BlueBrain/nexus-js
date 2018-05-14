import { removeTokenFromUrl } from '../../../libs/url';
import * as types from "./types";

const getLoginObjectFromURL = URL => {
  try {
    const token = removeTokenFromUrl(URL);
    if (!token) { return {} }
    const [, payload, ] = token.split('.');
    // Go through URL decoding to properly parse UTF-8 data.
    // @see https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
    const { name, exp } = JSON.parse(decodeURIComponent(escape(atob(payload))));
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
    const isValidToken = isFinite(tokenExpiration) && now < tokenExpiration;
    console.log('logging out: ', loginObject, tokenExpiration);
    // The token in state is good already
    if (isValidToken) {
      return
    }
    // Our current token is bad or doesnt exist, but we have just been redirected
    // with the query parameter token so that we can log in
    if (loginObject.token) {
      return dispatch(typeActions.login(loginObject));
    }
    // we have an expired token or no token at all, we should logout
    return dispatch(typeActions.logout());
  }
}

// TODO it might be silly to have reducerKey functionality here as there is
// likely not to have multiple users in a session..
const createLogout = reducerKey => () => {
  return {
    type: reducerKey + types.LOGOUT
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

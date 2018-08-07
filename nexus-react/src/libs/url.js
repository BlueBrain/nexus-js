import qs from 'querystring';

/**
 * Get an object with key:value pairs from URL query string.
 *
 * @param {string} querystring
 */
export function getAllUrlParams(querystring) {
  if (querystring.startsWith('?')) {
    querystring = querystring.slice(1);
  }
  return qs.decode(querystring);
}

export function removeTokenFromUrl(URL) {
  const [url, paramsString] = URL.split('?');
  if (paramsString === undefined) {
    return;
  }
  const params = getAllUrlParams(paramsString);
  const { access_token, ...updatedParamsMap } = params;
  let updatedParams = qs.encode(updatedParamsMap);
  updatedParams = updatedParams.length ? `?${updatedParams}` : '';
  const appLocation = `${url}${updatedParams}`;
  window.history.replaceState({}, document.title, appLocation);
  return access_token;
}

export function getLoginObjectFromURL (URL=window.location.href) {
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

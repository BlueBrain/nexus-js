import store from '../store';
import 'cross-fetch/polyfill';

export enum HttpConfigTypes {
  JSON = 'json',
  TEXT = 'text',
  ARRAY_BUFFER = 'arrayBuffer',
  BLOB = 'blob',
  BASE64 = 'base64',
  FILE = 'file',
}

export type httpTypes =
  | HttpConfigTypes.JSON
  | HttpConfigTypes.TEXT
  | HttpConfigTypes.ARRAY_BUFFER
  | HttpConfigTypes.BLOB
  | HttpConfigTypes.BASE64
  | HttpConfigTypes.FILE;

export interface HttpConfig {
  sendAs?: httpTypes;
  receiveAs?: httpTypes;
  useBase?: boolean;
  extraHeaders?: { [key: string]: string | null };
}

const getHeaders = (
  headers: { [key: string]: string | null } = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
): Headers => {
  const {
    auth: { accessToken },
  } = store.getState();
  let extraHeaders = {};
  if (accessToken) {
    extraHeaders = {
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return new Headers({
    ...headers,
    ...extraHeaders,
    mode: 'cors',
  });
};

const checkStatus = (response: Response): Response => {
  if (response.status >= 400) {
    throw new Error(response.statusText);
  }
  return response;
};

function prepareBody(
  body?: BodyInit,
  as: httpTypes = HttpConfigTypes.JSON,
): any {
  if (!body) {
    return undefined;
  }
  switch (as) {
    case HttpConfigTypes.TEXT:
      return String(body);
    case HttpConfigTypes.JSON:
      return JSON.stringify(body);
    case HttpConfigTypes.FILE:
    default:
      return body;
  }
}

async function prepareResponse(
  response: Response,
  as: httpTypes = HttpConfigTypes.JSON,
): Promise<any> {
  switch (as) {
    case HttpConfigTypes.JSON:
      return await response.json();
    case HttpConfigTypes.FILE:
    case HttpConfigTypes.ARRAY_BUFFER:
      return await response.arrayBuffer();
    case HttpConfigTypes.BASE64:
      const aBuff = await response.arrayBuffer();
      let binary = '';
      const bytes = [].slice.call(new Uint8Array(aBuff));
      bytes.forEach((b: any) => (binary += String.fromCharCode(b)));
      console.log(bytes);
      return btoa(binary);
    case HttpConfigTypes.TEXT:
    default:
      return await response.text();
  }
}

const CONFIG_DEFAULT_HTTP_GET = {
  useBase: true,
};

export function httpGet(url: string, config?: HttpConfig): Promise<any> {
  const squashedConfig: HttpConfig = { ...CONFIG_DEFAULT_HTTP_GET, ...config };
  const {
    api: { baseUrl },
  } = store.getState();
  const fetchURL = squashedConfig.useBase ? `${baseUrl}${url}` : url;
  return fetch(fetchURL, {
    headers: getHeaders(squashedConfig.extraHeaders),
  })
    .then(checkStatus)
    .then(r => prepareResponse(r, squashedConfig.receiveAs))
    .catch(e => {
      throw e;
    });
}

const CONFIG_DEFAULT_HTTP_POST = {
  useBase: true,
  sendAs: HttpConfigTypes.JSON,
};

export function httpPost<T = BodyInit>(
  url: string,
  body?: T,
  config?: HttpConfig,
): Promise<any> {
  const squashedConfig: HttpConfig = { ...CONFIG_DEFAULT_HTTP_POST, ...config };
  const {
    api: { baseUrl },
  } = store.getState();
  const fetchURL = squashedConfig.useBase ? `${baseUrl}${url}` : url;
  return fetch(fetchURL, {
    headers: getHeaders(squashedConfig.extraHeaders),
    method: 'POST',
    body: prepareBody(body as BodyInit | undefined, squashedConfig.sendAs),
  })
    .then(checkStatus)
    .then(r => prepareResponse(r, squashedConfig.receiveAs))
    .catch(e => {
      throw e;
    });
}

const CONFIG_DEFAULT_HTTP_PUT = {
  useBase: true,
};

export function httpPut(
  url: string,
  body?: Object,
  config?: HttpConfig,
): Promise<any> {
  const squashedConfig: HttpConfig = { ...CONFIG_DEFAULT_HTTP_PUT, ...config };
  const {
    api: { baseUrl },
  } = store.getState();
  const fetchURL = squashedConfig.useBase ? `${baseUrl}${url}` : url;
  return fetch(fetchURL, {
    headers: getHeaders(),
    method: 'PUT',
    body: JSON.stringify(body),
  })
    .then(checkStatus)
    .then(r => prepareResponse(r, squashedConfig.receiveAs))
    .catch(e => {
      throw e;
    });
}

export function httpPatch(
  url: string,
  body?: Object,
  config?: HttpConfig,
): Promise<any> {
  const squashedConfig: HttpConfig = { ...CONFIG_DEFAULT_HTTP_PUT, ...config };
  const {
    api: { baseUrl },
  } = store.getState();
  const fetchURL = squashedConfig.useBase ? `${baseUrl}${url}` : url;
  return fetch(fetchURL, {
    headers: getHeaders(),
    method: 'PATCH',
    body: JSON.stringify(body),
  })
    .then(checkStatus)
    .then(r => prepareResponse(r, squashedConfig.receiveAs))
    .catch(e => {
      throw e;
    });
}

export function httpDelete(url: string, config?: HttpConfig): Promise<any> {
  const squashedConfig: HttpConfig = { ...CONFIG_DEFAULT_HTTP_PUT, ...config };
  const {
    api: { baseUrl },
  } = store.getState();
  const fetchURL = squashedConfig.useBase ? `${baseUrl}${url}` : url;
  return fetch(fetchURL, {
    headers: getHeaders(),
    method: 'DELETE',
  })
    .then(checkStatus)
    .then(r => prepareResponse(r, squashedConfig.receiveAs))
    .catch(e => {
      throw e;
    });
}

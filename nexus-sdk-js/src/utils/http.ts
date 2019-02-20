import fetch, { Headers } from 'cross-fetch';
import store from '../store';
import { FileResponse } from '../File/types';
import { BodyInit } from 'node-fetch';

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

interface HttpConfig {
  sendAs?: httpTypes;
  receiveAs?: httpTypes;
  useBase?: boolean;
  extraHeaders?: { [key: string]: string };
}

const getHeaders = (
  headers: { [key: string]: string } = {
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

function jsonParser(response: Response): Promise<Object> {
  try {
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

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
    case HttpConfigTypes.FILE:
      const formData = new FormData();
      formData.append('file', body as string | Blob);
      return formData;
    default:
      return JSON.stringify(body);
  }
}

function prepareResponse<T = object>(
  body: T,
  as: httpTypes = HttpConfigTypes.JSON,
): any {
  switch (as) {
    case HttpConfigTypes.TEXT:
      return String(body);
    default:
      return JSON.stringify(body);
  }
}

const parseResponse = (response: Response, parser = jsonParser): any => {
  try {
    return parser(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

const parseJsonError = async (error: Response): Promise<JSON> => {
  const payload: JSON = await error.json();
  return payload;
};

const GET_DEFAULT_HTTP_CONFIG = {
  useBase: true,
};

export function httpGet(url: string, config?: HttpConfig): Promise<any> {
  const squashedConfig: HttpConfig = { ...GET_DEFAULT_HTTP_CONFIG, ...config };
  const {
    api: { baseUrl },
  } = store.getState();
  const fetchURL = squashedConfig.useBase ? `${baseUrl}${url}` : url;
  return fetch(fetchURL, {
    headers: getHeaders(squashedConfig.extraHeaders),
  })
    .then(checkStatus)
    .then(r => parseResponse(r))
    .catch(e => {
      throw e;
    });
}

const POST_DEFAULT_HTTP_CONFIG = {
  useBase: true,
  sendAs: HttpConfigTypes.JSON,
};

export function httpPost<T = BodyInit>(
  url: string,
  body?: T,
  config?: HttpConfig,
): Promise<any> {
  const squashedConfig: HttpConfig = { ...POST_DEFAULT_HTTP_CONFIG, ...config };
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
    .then(r => parseResponse(r))
    .catch(e => {
      throw e;
    });
}

export function httpPut(
  url: string,
  body?: Object,
  useBase: boolean = true,
): Promise<any> {
  const {
    api: { baseUrl },
  } = store.getState();
  const fetchURL = useBase ? `${baseUrl}${url}` : url;
  return fetch(fetchURL, {
    headers: getHeaders(),
    method: 'PUT',
    body: JSON.stringify(body),
  })
    .then(checkStatus)
    .then(r => parseResponse(r))
    .catch(e => {
      throw e;
    });
}

export function httpPatch(
  url: string,
  body?: Object,
  useBase: boolean = true,
): Promise<any> {
  const {
    api: { baseUrl },
  } = store.getState();
  const fetchURL = useBase ? `${baseUrl}${url}` : url;
  return fetch(fetchURL, {
    headers: getHeaders(),
    method: 'PATCH',
    body: JSON.stringify(body),
  })
    .then(checkStatus)
    .then(r => parseResponse(r))
    .catch(e => {
      throw e;
    });
}

export function httpDelete(url: string, useBase: boolean = true): Promise<any> {
  const {
    api: { baseUrl },
  } = store.getState();
  const fetchURL = useBase ? `${baseUrl}${url}` : url;
  return fetch(fetchURL, {
    headers: getHeaders(),
    method: 'DELETE',
  })
    .then(checkStatus)
    .then(r => parseResponse(r))
    .catch(e => {
      throw e;
    });
}

import fetch, { Headers } from 'cross-fetch';
import store from '../store';
import { FileResponse } from '../File/types';

type httpTypes = 'json' | 'text' | 'arrayBuffer' | 'blob';

interface HttpConfig {
  sendAs?: httpTypes;
  receiveAs?: httpTypes;
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

function prepareBody<T = object>(body: T, as: httpTypes = 'json'): any {
  switch (as) {
    case 'text':
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

export function httpGet(
  url: string,
  useBase: boolean = true,
  config?: HttpConfig,
): Promise<any> {
  const {
    api: { baseUrl },
  } = store.getState();
  const fetchURL = useBase ? `${baseUrl}${url}` : url;
  return fetch(fetchURL, {
    headers: getHeaders(config && config.extraHeaders),
  })
    .then(checkStatus)
    .then(r => parseResponse(r))
    .catch(e => {
      throw e;
    });
}

export function httpPost<T = Object>(
  url: string,
  body?: T,
  config?: HttpConfig,
  useBase: boolean = true,
): Promise<any> {
  const {
    api: { baseUrl },
  } = store.getState();
  const fetchURL = useBase ? `${baseUrl}${url}` : url;
  return fetch(fetchURL, {
    headers: getHeaders(config && config.extraHeaders),
    method: 'POST',
    body: prepareBody(body, config && config.sendAs),
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

export function httpPostFile(
  url: string,
  file: File,
  config?: HttpConfig,
): Promise<FileResponse> {
  const body = new FormData();
  body.append('file', file);
  const {
    api: { baseUrl },
  } = store.getState();
  return fetch(`${baseUrl}${url}`, {
    body,
    headers: getHeaders({
      ...(config && config.extraHeaders),
    }),
    method: 'POST',
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

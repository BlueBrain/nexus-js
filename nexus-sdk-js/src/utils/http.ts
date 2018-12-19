import fetch from 'cross-fetch';
import store from '../store';

type httpTypes = 'json' | 'text' | 'arrayBuffer' | 'blob';

interface HttpConfig {
  sendAs?: httpTypes;
  receiveAs?: httpTypes;
  extraHeaders?: { [key: string]: string };
}

const getHeaders = (
  headers: { [key: string]: string } = { 'Content-Type': 'application/json' },
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
  return response;
};

function jsonParser(response: Response): Promise<Object> {
  try {
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

function textParser(response: Response): Promise<string> {
  try {
    return response.text();
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

const parseError = (error: Error): Error => {
  throw new Error(error.message);
};

export function httpGet(url: string, useBase: boolean = true): Promise<any> {
  const {
    api: { baseUrl },
  } = store.getState();
  const fetchURL = useBase ? `${baseUrl}${url}` : url;
  return fetch(fetchURL, {
    headers: getHeaders(),
  })
    .then(checkStatus)
    .then(r => parseResponse(r))
    .catch(parseError);
}

export function httpPost<T = Object>(
  url: string,
  body?: T,
  config?: HttpConfig,
): Promise<any> {
  const {
    api: { baseUrl },
  } = store.getState();
  return fetch(`${baseUrl}${url}`, {
    headers: getHeaders(config && config.extraHeaders),
    method: 'POST',
    body: prepareBody(body, config && config.sendAs),
  })
    .then(checkStatus)
    .then(r => parseResponse(r))
    .catch(parseError);
}

export function httpPut(url: string, body?: Object): Promise<any> {
  const {
    api: { baseUrl },
  } = store.getState();
  return fetch(`${baseUrl}${url}`, {
    headers: getHeaders(),
    method: 'PUT',
    body: JSON.stringify(body),
  })
    .then(checkStatus)
    .then(r => parseResponse(r))
    .catch(parseError);
}

export const httpDelete = () => {};

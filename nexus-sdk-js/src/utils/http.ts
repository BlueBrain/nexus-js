import fetch, { Headers, HeaderInit, Response } from 'node-fetch';
import { store } from '../Nexus';

const getHeaders = (headers?: Object): HeaderInit => {
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
    ...extraHeaders,
    mode: 'cors',
    'Content-Type': 'application/json',
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

export function httpPost(url: string, body?: Object): Promise<any> {
  const {
    api: { baseUrl },
  } = store.getState();
  return fetch(`${baseUrl}${url}`, {
    headers: getHeaders(),
    method: 'POST',
    body: JSON.stringify(body),
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

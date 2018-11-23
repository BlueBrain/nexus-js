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
  });
};

const checkStatus = (response: Response): Response => {
  return response;
};

function jsonParser(response: Response): Promise<Object> {
  return response.json();
}

const parseResponse = (response: Response, parser = jsonParser): any => {
  return parser(response);
};

const parseError = (error: Error) => {
  throw new Error('Something went wrong in your http request');
};

export function httpGet(url: string): Promise<any> {
  const {
    api: { baseUrl },
  } = store.getState();
  return fetch(`${baseUrl}${url}`, {
    headers: getHeaders(),
  })
    .then(checkStatus)
    .then(r => parseResponse(r))
    .catch(parseError);
}

export const httpPost = (url: string, body: Object): Promise<any> => {
  const {
    api: { baseUrl },
  } = store.getState();
  return fetch(`${baseUrl}${url}`, {
    headers: getHeaders(),
    method: 'POST',
  })
    .then(checkStatus)
    .then(r => parseResponse(r))
    .catch(parseError);
};

export const httpPut = () => {};

export const httpDelete = () => {};

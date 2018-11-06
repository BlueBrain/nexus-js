import { store } from '../Nexus';

const getHeaders = (headers?: Object): Headers => {
  const { auth: { accessToken } } = store.getState();
  if  (!accessToken) {
    throw new Error('No access token found.');
  }
  return new Headers({
    Authorization: `Bearer ${accessToken}`,
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
  const { api: { baseUrl } } = store.getState();
  return fetch(`${baseUrl.getURL()}${url}`, {
    headers: getHeaders(),
  })
    .then(checkStatus)
    .then(r => parseResponse(r))
    .catch(parseError);
}

export const httpPost = (url: string, body: Object): Promise<any> => {
  const { api: { baseUrl } } = store.getState();
  return fetch(`${baseUrl.getURL()}${url}`, {
    headers: getHeaders(),
    method: 'POST',
  })
    .then(checkStatus)
    .then(r => parseResponse(r))
    .catch(parseError);
};

export const httpPut = () => {};

export const httpDelete = () => {};

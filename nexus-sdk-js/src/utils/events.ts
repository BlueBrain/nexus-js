import store from '../store';
const EventSource = require('eventsource');

// TODO: speak to backend to figure out token
const getHeaders = () => {
  const {
    auth: { accessToken },
  } = store.getState();
  let extraHeaders = {};
  if (accessToken) {
    extraHeaders = {
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return {
    ...extraHeaders,
    withCredentials: true,
  };
};

export function getEventSource(url: string): EventSource {
  const {
    api: { baseUrl },
  } = store.getState();
  return new EventSource(baseUrl + url, getHeaders());
}

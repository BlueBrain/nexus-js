// @ts-ignore
import EventSource = require('eventsource');
import store from '../store';

// TODO: speak to backend to figure out token
const getHeaders = (): EventSourceInit => {
  const {
    auth: { accessToken },
  } = store.getState();
  let extraHeaders = {};
  if (accessToken) {
    extraHeaders = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }
  return {
    withCredentials: true,
    ...extraHeaders,
  };
};

export function getEventSource(url: string): EventSource {
  const {
    api: { baseUrl },
  } = store.getState();
  return new EventSource(baseUrl + url, getHeaders());
}

export const parseMessageEventData = <T>(
  event: MessageEvent,
): ((callback?: ((data: T) => void)) => void) => (
  callback?: ((data: T) => void),
): void => callback && callback(JSON.parse(event.data));

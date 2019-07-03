import * as React from 'react';
import { NexusClient } from '@bbp/nexus-sdk';
import useNexusContext from './useNexusContext';
import { Observable } from '@bbp/nexus-link';

export default function useNexus<T = any, S = any>(
  apiCall: (nexus: NexusClient) => Promise<any> | Observable<any>,
  inputs: any[] = [],
) {
  const nexus = useNexusContext();
  const [state, setState] = React.useState<{
    loading: boolean;
    error: S;
    data: T;
  }>({
    loading: true,
    error: null,
    data: null,
  });
  React.useEffect(() => {
    setState({ ...state, loading: true });
    const res = apiCall(nexus);
    if (res instanceof Promise) {
      res
        .then((data: T) => setState({ ...state, data, loading: false }))
        .catch((error: S) => setState({ ...state, error, loading: false }));
      return () => {};
    }
    const subscription = (res as Observable<T>).subscribe({
      next: (data: T) => {
        setState({ ...state, data, loading: false });
      },
      error: (error: S) => {
        setState({ ...state, error, loading: false });
      },
      complete: () => {
        subscription.unsubscribe();
      },
    });
    return () => subscription.unsubscribe();
  }, inputs);

  return state;
}

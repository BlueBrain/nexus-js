export const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

export const isNode =
  typeof process !== 'undefined' &&
  process.versions != null &&
  process.versions.node != null;

export function buildQueryParams(options?: {
  [key: string]: string | number | boolean | undefined;
}): string {
  let opts = '';
  if (options && typeof options === 'object') {
    opts = Object.keys(options).reduce(
      (currentOps, key) =>
        options[key] !== undefined
          ? currentOps === ''
            ? `?${key}=${encodeURIComponent(`${options[key]}`)}`
            : `${currentOps}&${key}=${encodeURIComponent(`${options[key]}`)}`
          : currentOps,
      '',
    );
  }
  return opts;
}

export function removeLeadingSlash(string: string) {
  return string.replace(/^\/+/g, '');
}

export function getFetchInstance() {
  if (isBrowser) {
    return window.fetch || undefined;
  }
  if (isNode) {
    // @ts-ignore
    return global.fetch || undefined;
  }
  return undefined;
}

export function getAbortControllerInstance() {
  if (isBrowser) {
    return window.AbortController || undefined;
  }
  if (isNode) {
    // @ts-ignore
    return global.AbortController || undefined;
  }
  return undefined;
}

export function buildHeader(as: string) {
  let acceptHeader = 'application/ld+json';

  if (as === 'vnd.graph-viz') {
    acceptHeader = 'text/vnd.graphviz';
  }

  if (as === 'n-triples') {
    acceptHeader = 'application/n-triples';
  }

  return acceptHeader;
}

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
export const isBrowser = (): boolean => typeof window !== 'undefined';

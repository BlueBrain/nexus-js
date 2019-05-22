import { ResourceResponseCommon } from '../Resource/types';

export const defaultProps = (propsDefault: {
  [key: string]: any;
}) => (propsUsed?: { [key: string]: any }) => ({
  ...propsDefault,
  ...(propsUsed || {}),
});

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

export function isBrowser(): boolean {
  return typeof window === 'object';
}

// https://stackoverflow.com/questions/286141/remove-blank-attributes-from-an-object-in-javascript
export const removeEmpty = (obj: any): any =>
  Object.keys(obj)
    .filter(k => obj[k] !== null && obj[k] !== undefined) // Remove undef. and null.
    .reduce(
      (newObj, k) =>
        typeof obj[k] === 'object'
          ? Object.assign(newObj, { [k]: removeEmpty(obj[k]) }) // Recurse.
          : Object.assign(newObj, { [k]: obj[k] }), // Copy value.
      {},
    );

export const forceAsListOfStrings = (s: string | string[]): string[] =>
  Array.isArray(s) ? s : [s];

// Does this resource have type 'typeToCheck'?
export const typeEndsWith = (
  resourceResponse: ResourceResponseCommon,
  typeToCheck: string,
): boolean =>
  !!resourceResponse['@type'] &&
  forceAsListOfStrings(resourceResponse['@type']).some(type =>
    type.endsWith(typeToCheck),
  );

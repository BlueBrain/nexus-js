import { buildQueryParams } from '..';

describe('utils functions', () => {
  describe('buidlQueryParams()', () => {
    it('should return 1 query param', () => {
      expect(buildQueryParams({ foo: 'bar' })).toEqual('?foo=bar');
    });
    it('should return 2 query params', () => {
      expect(buildQueryParams({ foo: 'bar', rev: 2 })).toEqual(
        '?foo=bar&rev=2',
      );
    });
    it('should return 3 query params', () => {
      expect(
        buildQueryParams({ foo: 'bar', rev: 2, deprecated: true }),
      ).toEqual('?foo=bar&rev=2&deprecated=true');
    });
    it('should remove undefined values', () => {
      expect(buildQueryParams({ foo: 'bar', error: undefined })).toEqual(
        '?foo=bar',
      );
    });
    it('should return an empty string', () => {
      expect(buildQueryParams({})).toEqual('');
      expect(buildQueryParams()).toEqual('');
    });
    it('should return an encoded string', () => {
      expect(buildQueryParams({ description: 'I love encoded URI' })).toEqual(
        '?description=I%20love%20encoded%20URI',
      );
      expect(buildQueryParams()).toEqual('');
    });
  });
});

import {
  buildHeader,
  buildQueryParams,
  parseAsBuilder,
  removeLeadingSlash,
} from '../utils';

describe('utils functions', () => {
  describe('buildQueryParams()', () => {
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

  describe('removeLeadingSlash()', () => {
    it('should remove leading slash', () => {
      expect(removeLeadingSlash('/some/path')).toEqual('some/path');
    });
    it('should return the original string', () => {
      expect(removeLeadingSlash('*')).toEqual('*');
    });
  });

  describe('buildHeader()', () => {
    it('should return a header string', () => {
      expect(buildHeader('json')).toEqual('application/ld+json');
      expect(buildHeader('vnd.graph-viz')).toEqual('text/vnd.graphviz');
      expect(buildHeader('n-triples')).toEqual('application/n-triples');
    });
  });

  describe('parseAsBuilder()', () => {
    it('should return a parseAs value', () => {
      expect(parseAsBuilder('json')).toEqual('json');
      expect(parseAsBuilder('vnd.graph-viz')).toEqual('text');
      expect(parseAsBuilder('blob')).toEqual('blob');
      expect(parseAsBuilder('document')).toEqual('document');
      expect(parseAsBuilder('arraybuffer')).toEqual('text');
      expect(parseAsBuilder('n-triples')).toEqual('text');
      expect(parseAsBuilder('stream')).toEqual('text');
    });

    it('should retrun "json" when a random string is passed', () => {
      expect(parseAsBuilder('randomString')).toEqual('json');
    });
  });
});

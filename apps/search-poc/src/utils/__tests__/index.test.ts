import {
  getLabel,
  parseNexusUrl,
  camelCaseToLabelString,
  camelToKebab,
} from '../index';

describe('utils', () => {
  describe('camelCaseToLabelString', () => {
    it('should convert camel cased string to capitalized words', () => {
      expect(camelCaseToLabelString('camelCase')).toEqual('Camel Case');
    });
  });
  describe('camelToKebab', () => {
    it('should convert camel cased string to kebab case', () => {
      expect(camelToKebab('camelCase')).toEqual('camel-case');
    });
  });
  describe('getLabel()', () => {
    it('should return a string representing the name', () => {
      expect(
        getLabel(
          'https://sandbox.bluebrainnexus.io/v1/storages/bbp/studio/defaultStorage',
        ),
      ).toEqual('defaultStorage');
      expect(
        getLabel(
          'https://sandbox.bluebrainnexus.io/v1/storages/bbp/studio/defaultStorage#gpfs',
        ),
      ).toEqual('gpfs');
    });
  });
  describe('parseNexusUrl()', () => {
    it('should throw an error if url is not defined', () => {
      expect(() => parseNexusUrl('')).toThrow('selfUrl should be defined');
    });

    it('should throw an error if url is not valid', () => {
      expect(() =>
        parseNexusUrl('http://nexuys.com/v1/resources/org'),
      ).toThrowError('Error while parsing selfUrl');
    });

    it('should parse trivial project url', () => {
      expect(parseNexusUrl('https://nexus.com/v1/resources/org/proj')).toEqual({
        deployment: 'https://nexus.com/v1',
        entityType: 'resource',
        org: 'org',
        project: 'proj',
        schema: undefined,
        id: undefined,
      });
    });

    it('should parse project url with non-word symbols in org and proj labels', () => {
      expect(
        parseNexusUrl('https://nexus.com/v1/resources/o-r_g:1/p-r_o:j2'),
      ).toEqual({
        deployment: 'https://nexus.com/v1',
        entityType: 'resource',
        org: 'o-r_g:1',
        project: 'p-r_o:j2',
        schema: undefined,
        id: undefined,
      });
    });

    it('should parse self url with non-word symbols in capturing groups', () => {
      expect(
        parseNexusUrl(
          'https://nexus.com/v1/resources/o-r_g:1/p-r_o:j2/sch:ema/id-1_2',
        ),
      ).toEqual({
        deployment: 'https://nexus.com/v1',
        entityType: 'resource',
        org: 'o-r_g:1',
        project: 'p-r_o:j2',
        schema: 'sch:ema',
        id: 'id-1_2',
      });
    });

    it('should parse valid self url', () => {
      expect(
        parseNexusUrl('https://nexus.com/v1/resources/org/proj/_/id'),
      ).toEqual({
        deployment: 'https://nexus.com/v1',
        entityType: 'resource',
        org: 'org',
        project: 'proj',
        schema: '_',
        id: 'id',
      });
    });

    it('should parse url with http protocol', () => {
      expect(parseNexusUrl('http://nexus.com/v1/resources/org/proj')).toEqual({
        deployment: 'http://nexus.com/v1',
        entityType: 'resource',
        org: 'org',
        project: 'proj',
        schema: undefined,
        id: undefined,
      });
    });

    it('should parse a project url with non default deployment base', () => {
      expect(
        parseNexusUrl('http://nexus.com/custom-base/resources/org/proj'),
      ).toEqual({
        deployment: 'http://nexus.com/custom-base',
        entityType: 'resource',
        org: 'org',
        project: 'proj',
        schema: undefined,
        id: undefined,
      });
    });

    it('should parse a self url with non default deployment base', () => {
      expect(
        parseNexusUrl('http://nexus.com/custom-base/resources/org/proj/_/id'),
      ).toEqual({
        deployment: 'http://nexus.com/custom-base',
        entityType: 'resource',
        org: 'org',
        project: 'proj',
        schema: '_',
        id: 'id',
      });
    });

    it('should parse a self url of different entity types', () => {
      expect([
        parseNexusUrl('http://nexus.com/v1/views/org/proj/_/id').entityType,
        parseNexusUrl('http://nexus.com/v1/projects/org/proj/_/id').entityType,
        parseNexusUrl('http://nexus.com/v1/resources/org/proj/_/id').entityType,
        parseNexusUrl('http://nexus.com/v1/files/org/proj/_/id').entityType,
        parseNexusUrl('http://nexus.com/v1/acls/org/proj/_/id').entityType,
        parseNexusUrl('http://nexus.com/v1/orgs/org/proj/_/id').entityType,
      ]).toEqual(['view', 'project', 'resource', 'file', 'acl', 'org']);
    });

    it('should throw if deployment uri contains multiple entity types', () => {
      expect(() =>
        parseNexusUrl('http://n.com/acls/v1/orgs/project/schema/id'),
      ).toThrow('Url contains multiple entity types which is not supported');
    });
  });
});

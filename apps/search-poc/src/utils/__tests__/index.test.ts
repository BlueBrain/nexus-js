import { getLabel, getOrgAndProjectLabel } from '../index';

describe('utils', () => {
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
  describe('getOrgAndProjectLabel()', () => {
    it('should return undefined', () => {
      expect(getOrgAndProjectLabel('')).toEqual(undefined);
      expect(
        getOrgAndProjectLabel('http://nexuys.com/v1/resources/org'),
      ).toEqual(undefined);
    });
    it('should return an org and project', () => {
      expect(
        getOrgAndProjectLabel('http://nexus.com/v1/resources/myorg/myproject'),
      ).toEqual({
        org: 'myorg',
        project: 'myproject',
      });
      expect(
        getOrgAndProjectLabel(
          'http://nexus.com/v1/views/myorg/myproject/_/viewid',
        ),
      ).toEqual({
        org: 'myorg',
        project: 'myproject',
      });
      expect(
        getOrgAndProjectLabel(
          'http://nexus.com/v1/views/my$org/my_project/_/viewid',
        ),
      ).toEqual({
        org: 'my$org',
        project: 'my_project',
      });
      expect(
        getOrgAndProjectLabel(
          'http://nexus.com/v1/views/my-org/my:project/_/viewid',
        ),
      ).toEqual({
        org: 'my-org',
        project: 'my:project',
      });
    });
  });
});

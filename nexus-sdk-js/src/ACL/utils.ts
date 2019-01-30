import ACL from '.';
import { ACLResponse, ListACLResponse, ListRealmOption } from './types';
import { httpGet } from '../utils/http';
import { buildQueryParams } from '../utils';
import { PaginatedList, PaginationSettings } from '../utils/types';

export async function listACL(
  path: string,
  options?: ListRealmOption,
): Promise<PaginatedList<ACL>> {
  try {
    const opts = buildQueryParams(options);
    const aclListResponse: ListACLResponse = await httpGet(
      `/acls/${path}${opts}`,
    );

    const acls: ACL[] = aclListResponse._results.map(
      aclResponse =>
        new ACL({ ...aclResponse, '@context': aclListResponse['@context'] }),
    );
    return {
      total: aclListResponse._total,
      index: (options && options.from) || 1,
      results: acls,
    };
  } catch (error) {
    throw error;
  }
}

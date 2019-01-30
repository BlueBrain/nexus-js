import ACL from '.';
import { ACLResponse } from './types';
import { httpGet } from '../utils/http';
import { buildQueryParams } from '../utils';

export async function getACL(
  path: string,
  options?: {
    rev?: number;
    self?: boolean;
  },
): Promise<ACL> {
  try {
    const opts = buildQueryParams(options);
    const aclResponse: ACLResponse = await httpGet(`/acls/${path}${opts}`);
    return new ACL(aclResponse);
  } catch (error) {
    throw error;
  }
}

getACL('asd');

import ACL from '.';
import { ACLResponse } from './types';
import { httpGet } from '../utils/http';

export async function getACL(
  path: string,
  rev?: number,
  self?: boolean,
): Promise<ACL> {
  try {
    const aclResponse: ACLResponse = await httpGet(`/acls/${path}`);
    return new ACL(aclResponse);
  } catch (error) {
    throw error;
  }
}

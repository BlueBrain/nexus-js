import { httpGet, httpPut, httpDelete } from '../utils/http';
import Resolver from '.';
import { PaginatedList, DEFAULT_LIST_SIZE } from '../utils/types';
import { buildQueryParams } from '../utils';
import { ListResolverResponse, ResolverResponse, ResolverResponseCommon, ListResolverOptions, ResolverTypes } from './types';

export async function getResolver(
  orgLabel: string,
  projectLabel: string,
  resolverId: string,
  rev?: number,
): Promise<ResolverResponse> {
  const ops = rev ? `?rev=${rev}` : '';
  try {
    const resolverResponse: ResolverResponse = await httpGet(
      `/resolvers/${orgLabel}/${projectLabel}/${resolverId}${ops}`,
    );
    return resolverResponse;
  } catch (error) {
    throw error;
  }
}

export async function listResolvers(
  orgLabel: string,
  projectLabel: string,
  options: ListResolverOptions = {
    from: 0,
    size: DEFAULT_LIST_SIZE,
    deprecated: false,
  },
): Promise<PaginatedList<Resolver>> {
  const opts: string = buildQueryParams(options);
  try {
    const resolverResponse: ListResolverResponse = await httpGet(
      `/resolvers/${orgLabel}/${projectLabel}${opts}`,
    );
    const total: number = resolverResponse._total;
    const index: number = (options && options.from) || 1;
    const results: Resolver[] = resolverResponse._results.map(
      (commonResponse: ResolverResponseCommon) =>
        new Resolver(orgLabel, projectLabel, {
          ...commonResponse,
          '@context': resolverResponse['@context'],
        }),
    );

    return {
      total,
      index,
      results,
    };
  } catch (error) {
    throw error;
  }
}

export const normalizeType = (type: string): string => <string>type.split("/").pop();

export const isValidType = (normalizedType: string): normalizedType is ResolverTypes => {
  return ["InProject", "CrossProject"].includes(normalizedType);
};

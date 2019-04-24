import { httpGet, httpPut, httpDelete } from '../utils/http';
import Realm from '.';
import {
  RealmResponse,
  ListRealmOptions,
  ListRealmResponse,
  RealmResponseCommon,
  CreateRealmPayload,
} from './types';
import { PaginatedList, DEFAULT_LIST_SIZE } from '../utils/types';
import { buildQueryParams } from '../utils';

export async function getRealm(
  realmLabel: string,
  rev?: number,
): Promise<Realm> {
  const ops = rev ? `?rev=${rev}` : '';
  try {
    const realmResponse: RealmResponse = await httpGet(
      `/realms/${realmLabel}${ops}`,
    );
    return new Realm(realmResponse);
  } catch (error) {
    throw error;
  }
}

export async function listRealms(
  listRealmOptions: ListRealmOptions = {
    from: 0,
    size: DEFAULT_LIST_SIZE,
  },
): Promise<PaginatedList<Realm>> {
  try {
    const opts = buildQueryParams(listRealmOptions);
    const listRealmResponse: ListRealmResponse = await httpGet(
      `/realms${opts}`,
    );
    const realms = listRealmResponse._results.map(
      (r: RealmResponseCommon) =>
        new Realm({ ...r, '@context': listRealmResponse['@context'] }),
    );

    return {
      total: listRealmResponse._total,
      index: (listRealmOptions && listRealmOptions.from) || 0,
      results: realms,
    };
  } catch (error) {
    throw error;
  }
}

export async function createRealm(
  realmLabel: string,
  realmPayload: CreateRealmPayload,
): Promise<Realm> {
  try {
    const realmResponse: RealmResponse = await httpPut(
      `/realms/${realmLabel}`,
      realmPayload,
    );
    return new Realm(realmResponse);
  } catch (error) {
    throw error;
  }
}

export async function updateRealm(
  realmLabel: string,
  rev: number,
  realmPayload: CreateRealmPayload,
): Promise<Realm> {
  try {
    const realmResponse: RealmResponse = await httpPut(
      `/realms/${realmLabel}?rev=${rev}`,
      realmPayload,
    );
    return new Realm(realmResponse);
  } catch (error) {
    throw error;
  }
}

export async function deprecateRealm(
  realmLabel: string,
  rev: number,
): Promise<Realm> {
  try {
    const realmResponse: RealmResponse = await httpDelete(
      `/realms/${realmLabel}?rev=${rev}`,
    );
    return new Realm(realmResponse);
  } catch (error) {
    throw error;
  }
}

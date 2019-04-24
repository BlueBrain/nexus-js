import createHttpLink from '../utils/http';
import Realm from '.';
import {
  RealmResponse,
  ListRealmOptions,
  ListRealmResponse,
  RealmResponseCommon,
  CreateRealmPayload,
} from './types';
import {
  PaginatedList,
  DEFAULT_LIST_SIZE,
  DEFAULT_PAGINATION_SETTINGS,
  PaginationSettings,
} from '../utils/types';
import Store from '../utils/Store';
import { buildQueryParams } from '../utils';

export interface RealmUtils {
  get(realmLabel: string, rev?: number): Promise<Realm>;
  list(listRealmOptions: PaginationSettings): Promise<PaginatedList<Realm>>;
  create(realmLabel: string, realmPayload: CreateRealmPayload): Promise<Realm>;
  update(
    realmLabel: string,
    rev: number,
    realmPayload: CreateRealmPayload,
  ): Promise<Realm>;
  deprecate(realmLabel: string, rev: number): Promise<Realm>;
}

export default function makeRealmUtils(store: Store): RealmUtils {
  const { httpGet, httpPut, httpDelete } = createHttpLink(store);

  return {
    get: async (realmLabel: string, rev?: number): Promise<Realm> => {
      const ops = rev ? `?rev=${rev}` : '';
      try {
        const realmResponse: RealmResponse = await httpGet(
          `/realms/${realmLabel}${ops}`,
        );
        return new Realm(realmResponse);
      } catch (error) {
        throw error;
      }
    },

    list: async (
      listRealmOptions: ListRealmOptions = {
        from: 0,
        size: DEFAULT_LIST_SIZE,
      },
    ): Promise<PaginatedList<Realm>> => {
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
          index:
            (listRealmOptions && listRealmOptions.from) ||
            DEFAULT_PAGINATION_SETTINGS.from,
          results: realms,
        };
      } catch (error) {
        throw error;
      }
    },

    create: async (
      realmLabel: string,
      realmPayload: CreateRealmPayload,
    ): Promise<Realm> => {
      try {
        const realmResponse: RealmResponse = await httpPut(
          `/realms/${realmLabel}`,
          realmPayload,
        );
        return new Realm(realmResponse);
      } catch (error) {
        throw error;
      }
    },

    update: async (
      realmLabel: string,
      rev: number,
      realmPayload: CreateRealmPayload,
    ): Promise<Realm> => {
      try {
        const realmResponse: RealmResponse = await httpPut(
          `/realms/${realmLabel}?rev=${rev}`,
          realmPayload,
        );
        return new Realm(realmResponse);
      } catch (error) {
        throw error;
      }
    },

    deprecate: async (realmLabel: string, rev: number): Promise<Realm> => {
      try {
        const realmResponse: RealmResponse = await httpDelete(
          `/realms/${realmLabel}?rev=${rev}`,
        );
        return new Realm(realmResponse);
      } catch (error) {
        throw error;
      }
    },
  };
}

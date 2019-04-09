import Organization from '.';
import {
  ListOrgOptions,
  CreateOrgPayload,
  OrgResponse,
  ListOrgResponse,
  OrgResponseCommon,
  OrgCreatedEvent,
  OrgUpdatedEvent,
  OrgDeprecatedEvent,
  OrgEventListeners,
  OrgEventType,
} from './types';
import createHttpLink from '../utils/http';
import { CreateOrganizationException } from './exceptions';
import { PaginatedList } from '../utils/types';
import { getEventSource, parseMessageEventData } from '../utils/events';
// @ts-ignore
import EventSource = require('eventsource');
import { buildQueryParams } from '../utils';
import Store from '../utils/Store';

export interface OrgUtils {
  create(label: string, orgPayload?: CreateOrgPayload): Promise<Organization>;
  update(
    orgLabel: string,
    rev: number,
    orgPayload: CreateOrgPayload,
  ): Promise<Organization>;
  get(
    orgLabel: string,
    options?: { rev?: number; tag?: string },
  ): Promise<Organization>;
  list(options?: ListOrgOptions): Promise<PaginatedList<Organization>>;
  update(
    orgLabel: string,
    rev: number,
    orgPayload: CreateOrgPayload,
  ): Promise<Organization>;
  deprecate(orgLabel: string, rev: number): Promise<Organization>;
  // @ts-ignore
  subscribe(listeners: OrgEventListeners): EventSource;
}

export const lol = 'lol';

export default function makeOrgUtils(store: Store): OrgUtils {
  const { httpGet, httpPut, httpDelete } = createHttpLink(store);

  return {
    /**
     *
     * @param label The label of your organization
     * @param name The name of your organization
     */
    create: async (
      label: string,
      orgPayload?: CreateOrgPayload,
    ): Promise<Organization> => {
      try {
        const orgResponse: OrgResponse = await httpPut(
          `/orgs/${label}`,
          orgPayload,
        );
        return new Organization({ ...orgResponse, ...orgPayload }, store);
      } catch (error) {
        throw new CreateOrganizationException(error.message);
      }
    },

    /**
     *
     * @param orgLabel The organization label to fetch
     * @param Object<revision, tag> The specific tag OR revision to fetch
     */
    get: async (
      orgLabel: string,
      options?: { rev?: number; tag?: string },
    ): Promise<Organization> => {
      try {
        const opts = buildQueryParams(options);
        const orgResponse: OrgResponse = await httpGet(
          `/orgs/${orgLabel}${opts}`,
        );
        const org = new Organization(orgResponse, store);
        return org;
      } catch (error) {
        throw error;
      }
    },

    list: async (
      options?: ListOrgOptions,
    ): Promise<PaginatedList<Organization>> => {
      const opts = buildQueryParams(options);
      try {
        const listOrgResponse: ListOrgResponse = await httpGet(`/orgs${opts}`);
        if (listOrgResponse.code || !listOrgResponse._results) {
          return {
            total: 0,
            index: 0,
            results: [],
          };
        }

        const orgs: Organization[] = listOrgResponse._results.map(
          (commonResponse: OrgResponseCommon) =>
            new Organization(
              {
                ...commonResponse,
                '@context': listOrgResponse['@context'],
              },
              store,
            ),
        );

        return {
          total: listOrgResponse._total,
          index: (options && options.from) || 1,
          results: orgs,
        };
      } catch (error) {
        throw error;
      }
    },

    /**
     *
     * @param orgLabel Current organization label
     * @param rev Last known revision
     * @param newName Knew name the organization will be called with
     */
    update: async (
      orgLabel: string,
      rev: number,
      orgPayload: CreateOrgPayload,
    ): Promise<Organization> => {
      try {
        const orgResponse: OrgResponse = await httpPut(
          `/orgs/${orgLabel}?rev=${rev}`,
          orgPayload,
        );
        return new Organization(orgResponse, store);
      } catch (error) {
        throw error;
      }
    },

    /**
     *
     * @param orgLabel Label of the Org to be deprecated
     * @param rev Last know revision
     */
    deprecate: async (orgLabel: string, rev: number): Promise<Organization> => {
      try {
        const orgResponse: OrgResponse = await httpDelete(
          `/orgs/${orgLabel}?rev=${rev}`,
        );
        return new Organization(orgResponse, store);
      } catch (error) {
        throw error;
      }
    },

    subscribe: (listeners: OrgEventListeners): EventSource => {
      const event: EventSource = getEventSource('/orgs/events');

      // set event listeners
      listeners.onOpen && (event.onopen = listeners.onOpen);
      listeners.onError && (event.onerror = listeners.onError);
      listeners.onOrgCreated &&
        event.addEventListener(OrgEventType.OrgCreated, (event: Event) =>
          parseMessageEventData<OrgCreatedEvent>(event as MessageEvent)(
            listeners.onOrgCreated,
          ),
        );
      listeners.onOrgUpdated &&
        event.addEventListener(OrgEventType.OrgUpdated, (event: Event) =>
          parseMessageEventData<OrgUpdatedEvent>(event as MessageEvent)(
            listeners.onOrgUpdated,
          ),
        );
      listeners.onOrgDeprecated &&
        event.addEventListener(OrgEventType.OrgDeprecated, (event: Event) =>
          parseMessageEventData<OrgDeprecatedEvent>(event as MessageEvent)(
            listeners.onOrgDeprecated,
          ),
        );

      return event;
    },
  };
}

import { httpGet } from '../utils/http';
import Realm from '.';
import { RealmResponse } from './types';

export async function getRealm(realmLabel: string, rev: number = 1): Promise<Realm> {
  try {
  const realmResponse: RealmResponse = await httpGet(`/realms/${realmLabel}?rev=${rev}`)
  return new Realm(realmResponse);
  } catch (error) {
    throw error
  }
}
export async function listRealm(): Promise<Realm[]> {}
export async function createRealm() {}
export async function updateRealm() {}
export async function deprecateRealm() {}


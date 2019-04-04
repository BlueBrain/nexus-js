import { httpGet } from '../utils/http';
import { StatisticsResponse } from './types';
import Statistics from '.';

export async function getViewStatistics(
  orgLabel: string,
  projectLabel: string,
  viewId: string,
): Promise<Statistics> {
  try {
    const data: StatisticsResponse = await httpGet(
      `/views/${orgLabel}/${projectLabel}/${encodeURIComponent(
        viewId,
      )}/statistics`,
    );
    return new Statistics(data);
  } catch (error) {
    throw error;
  }
}

export async function getResourceStatistics(
  orgLabel: string,
  projectLabel: string,
  schemaId: string,
  viewId: string,
): Promise<Statistics> {
  try {
    const data: StatisticsResponse = await httpGet(
      `/resources/${orgLabel}/${projectLabel}/${encodeURIComponent(
        schemaId,
      )}/${encodeURIComponent(viewId)}/statistics`,
    );
    return new Statistics(data);
  } catch (error) {
    throw error;
  }
}

import { StatisticsResponse } from './types';
import { getViewStatistics, getResourceStatistics } from './utils';

export default class Statistics {
  static getForView = getViewStatistics;
  static getForResource = getResourceStatistics;

  readonly context: string;
  readonly totalEvents: number;
  readonly processedEvents: string;
  readonly remainingEvents: string;
  readonly evaluatedEvents: string;
  readonly discardedEvents: string;
  readonly lastEventDateTime: string;
  readonly lastProcessedEventDateTime: string;
  readonly delayInSeconds: string;

  constructor(response: StatisticsResponse) {
    this.context = response['@context'];
    this.totalEvents = response.totalEvents;
    this.processedEvents = response.processedEvents;
    this.remainingEvents = response.remainingEvents;
    this.evaluatedEvents = response.evaluatedEvents;
    this.discardedEvents = response.discardedEvents;
    this.lastEventDateTime = response.lastEventDateTime;
    this.lastProcessedEventDateTime = response.lastProcessedEventDateTime;
    this.delayInSeconds = response.delayInSeconds;
  }
}

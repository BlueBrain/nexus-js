export interface StatisticsResponse {
  '@context': string;
  totalEvents: number;
  processedEvents: string;
  remainingEvents: string;
  evaluatedEvents: string;
  discardedEvents: string;
  lastEventDateTime: string;
  lastProcessedEventDateTime: string;
  delayInSeconds: string;
}

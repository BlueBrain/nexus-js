import { PaginatedList, PaginationSettings } from '../utils/types';
import Resource from '../Resource';

export { default as SparqlView } from './SparqlView';

export default abstract class View {
  constructor(readonly orgLabel: string, readonly projectLabel: string) {
    this.orgLabel = orgLabel;
    this.projectLabel = projectLabel;
  }

  abstract async query(queryObject: any): Promise<any>;
}

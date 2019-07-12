import { Link, Operation, NextLink } from './types';
import { Observable } from 'rxjs';

export class StatefulLink {
  constructor(link?: Link) {
    if (link) this.request = link;
  }
  request(operation: Operation, forward?: NextLink): Observable<any> {
    throw 'You need to implement request.';
  }
}

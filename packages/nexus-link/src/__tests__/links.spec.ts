import * as Links from '../links';
// Context, NextLink, Link
import { Operation } from '../types';
import { Observable } from 'rxjs';

describe('setToken', () => {
  it('sets the  token  at the operation headers/Authorization', () => {
    const setTokenLink = Links.setToken('mytoken');
    const testLink = (operation: Operation) =>
      new Observable(observer => {
        observer.next(operation.headers['Authorization']);
        observer.complete();
      });
    const obs = setTokenLink({ path: 'testpath' }, testLink);
    let result;
    obs.subscribe(x => {
      result = x;
    });
    expect(result).toBe('bearer mytoken');
  });
});

describe('setMethod', () => {
  it('sets the  method  at the operation', () => {
    const setTokenLink = Links.setMethod('get');
    const testLink = (operation: Operation) =>
      new Observable(observer => {
        observer.next(operation.method);
        observer.complete();
      });
    const obs = setTokenLink({ path: 'testpath' }, testLink);
    let result;
    obs.subscribe(x => {
      result = x;
    });
    expect(result).toBe('get');
  });
});

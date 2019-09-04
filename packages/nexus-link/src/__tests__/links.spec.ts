import * as Links from '../links';
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
  it('throws an error when no link is passed', () => {
    const setTokenLink = Links.setToken('mytoken');
    expect(() => setTokenLink({ path: 'testpath' })).toThrow();
  });
});

describe('setMethod', () => {
  it('sets the  method  at the operation', () => {
    const setMethodLink = Links.setMethod('get');
    const testLink = (operation: Operation) =>
      new Observable(observer => {
        observer.next(operation.method);
        observer.complete();
      });
    const obs = setMethodLink({ path: 'testpath' }, testLink);
    let result;
    obs.subscribe(x => {
      result = x;
    });
    expect(result).toBe('get');
  });
  it('throws an error when no link is passed', () => {
    const setMethodLink = Links.setMethod('get');
    expect(() => setMethodLink({ path: 'testpath' })).toThrow();
  });
});

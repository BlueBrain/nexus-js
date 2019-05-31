import * as utils from '../utils';
import Observable from 'zen-observable-ts';

describe('something', () => {
  it('should', () => {
    expect(1).toEqual(1);
  });
});

describe('toPromise', () => {
  it('should conver stuff to a promise', async () => {
    const obs = new Observable(subscribe => {
      subscribe.next(1);
    });
    const value = await utils.toPromise(obs);

    expect(value).toBe(1);
  });
});

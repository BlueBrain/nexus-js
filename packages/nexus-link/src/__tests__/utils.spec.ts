import * as utils from '../utils';
import zenObservableTs from 'zen-observable-ts';

describe('toPromise', () => {
  it('should convery an Observable to a Promise', async () => {
    const obs = new zenObservableTs(subscribe => {
      subscribe.next(1);
    });
    const value = await utils.toPromise(obs);

    expect(value).toBe(1);
  });
});

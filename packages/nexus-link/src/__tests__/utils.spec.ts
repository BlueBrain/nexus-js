import * as utils from '../utils';
import { Observable } from 'rxjs';

describe('toPromise', () => {
  it('should convert an Observable to a Promise', async () => {
    const obs = new Observable(subscribe => {
      subscribe.next(1);
    });
    const value = await utils.toPromise(obs);

    expect(value).toBe(1);
  });
});

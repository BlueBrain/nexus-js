export type ReducerFunction = {
  (source: State): State;
};

export type State = {
  [key: string]: any;
};

export default class Store {
  state: State;

  constructor(initialState: State) {
    this.state = initialState;
  }

  getState() {
    return this.state;
  }

  update(storeKey: string, updadeFn: ReducerFunction) {
    const nextState: State = updadeFn(this.state[storeKey]);
    if (nextState !== this.state[storeKey]) {
      this.state[storeKey] = nextState;
    }
  }
}

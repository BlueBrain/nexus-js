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

  update(storeKey: string, updateFn: ReducerFunction) {
    const nextState: State = updateFn(this.state[storeKey]);
    if (nextState !== this.state[storeKey]) {
      this.state[storeKey] = nextState;
    }
  }
}

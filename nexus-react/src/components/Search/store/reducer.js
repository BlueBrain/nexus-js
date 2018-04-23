import * as types from "./types";

/*
  reducerKey allows you to make unique places in the redux state
  object where the actions for this will be assigned so as not
  to overlap other search instances
*/
export default (reducerKey = "") => (
  state = {
    pending: false,
    error: null,
    returned: false,
    results: [],
    hits: 0
  },
  action
) => {
  switch (action.type) {
    case reducerKey + types.SEARCH_PENDING:
      return Object.assign({}, state, {
        error: null,
        pending: true,
        returned: false,
        hits: 0
      });

    case reducerKey + types.SEARCH_FULFILLED:
      let { hits, results } = action.payload;
      return Object.assign({}, state, {
        pending: false,
        error: null,
        returned: true,
        results,
        hits
      });

    case reducerKey + types.SEARCH_FAILED:
      return Object.assign({}, state, {
        pending: false,
        results: [],
        error: action.error,
        returned: true,
        hits: 0
      });

    default:
      return state;
  }
};

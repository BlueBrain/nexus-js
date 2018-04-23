import { get } from "lodash";

/**
 *
 *
 * @param {object} storeDependencies - an object with store paths by key
 * @param {function} getState - from thunk
 * @return {object} - an object with the values from store
 */
function getStoreDependencies(storeDependencies, getState) {
  return Object.keys(storeDependencies).reduce((memo, key) => {
    let storePath = storeDependencies[key];
    memo[key] = get(getState(), storePath);
    return memo;
  }, {});
}

export default getStoreDependencies;

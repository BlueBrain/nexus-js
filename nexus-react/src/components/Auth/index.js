import createReducer from "./store/reducer";
import createActions from "./store/actions";
import LoginContainer from "./LoginContainer";

/*
  reducerKey allows you to make unique places in the redux state
  object where the actions for this will be assigned so as not
  to overlap other search instances
*/
/**
 * @param  {object} {storeDependencies- the deps that your actions might have to consume from store
 * @param  {string} reducerKey - }
 */
function createAuthStore(reducerKey) {
  // make the reducerKey slightly easier to read if available
  reducerKey = reducerKey ? reducerKey.toUpperCase() + '_' : reducerKey;
  return {
    reducer: createReducer(reducerKey),
    actions: createActions(reducerKey)
  };
}
export default {
  createStore: createAuthStore,
  Container: LoginContainer,
}
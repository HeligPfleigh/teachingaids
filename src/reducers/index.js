import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import user from './user';
import runtime from './runtime';

export default function createRootReducer({ apolloClient }) {
  return combineReducers({
    apollo: apolloClient.reducer(),
    user,
    runtime,
    form: formReducer,
  });
}

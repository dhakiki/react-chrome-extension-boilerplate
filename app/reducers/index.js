import { combineReducers } from 'redux';
import todos from './todos';
import settings from './settings';

export default combineReducers({
  todos,
  settings
});

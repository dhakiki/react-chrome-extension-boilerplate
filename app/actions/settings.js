import * as types from '../constants/ActionTypes';

export function setSelectingPageId(id) {
  return { type: types.SET_SELECTING_PAGE_ID, id };
}

export function clearSelectingPageId(id) {
  return { type: types.CLEAR_SELECTING_PAGE_ID, id };
}

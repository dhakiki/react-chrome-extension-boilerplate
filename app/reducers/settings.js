import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  selectingPageId: ''
};

const actionsMap = {
  [ActionTypes.SET_SELECTING_PAGE_ID](state, action) {
    return {
      selectingPageId: action.id,
    };
  },
  [ActionTypes.CLEAR_SELECTING_PAGE_ID](state, action) {
    return {
      selectingPageId: '',
    };
  },
};

export default function settings(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}

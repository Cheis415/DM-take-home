import produce from 'immer';

/*
 *
 * HomePage reducer
 *
 *
 */

import {
  FETCH_INSPIRATION,
  FETCH_INSPIRATION_SUCCESS,
  FETCH_INSPIRATION_FAILURE,
} from './constants';

export const initialState = {
  inspiration: [],
  fetching: false,
  resulted: false,
  error: false,
};

/**
 *
 *Immer creates a draft of the state that you can alter
  then immer turns that draft into the actual state
  keeping reducer functions pure and avoiding a lot of
  boilerplate, eg: spreading out state
 *
 */

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_INSPIRATION:
        draft.fetching = true;
        draft.resulted = false;
        draft.error = false;
        break;
      case FETCH_INSPIRATION_SUCCESS:
        draft.inspiration = action.inspiration;
        draft.fetching = false;
        draft.resulted = true;
        draft.error = false;
        break;
      case FETCH_INSPIRATION_FAILURE:
        draft.fetching = false;
        draft.resulted = true;
        draft.error = true;
        break;
    }
  });

export default homePageReducer;

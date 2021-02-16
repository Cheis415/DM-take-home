import produce from 'immer';
import {
  CHANGE_INSPIRATION,
  SAVE_INSPIRATION,
  SAVE_INSPIRATION_SUCCESS,
  SAVE_INSPIRATION_FAILURE,
  RESET_INSPIRATION,
} from './constants';

const initialState = {
  inspirations: '',
  saving: false,
  resulted: false,
  error: false,
};

const domainKey = 'newInspiration';

/*
 *
 * Inspiration reducer
  
  Immer creates a draft of the state that you can alter
  then immer turns that draft into the actual state
  keeping reducer functions pure and avoiding a lot of
  boilerplate, eg: spreading out state
 
 *
 */

/* eslint-disable default-case, no-param-reassign */
const newInspirationReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_INSPIRATION:
        if (!draft.saving) {
          draft.inspirations = action.inspirations;
          draft.resulted = false;
          draft.error = false;
        }
        break;
      case SAVE_INSPIRATION:
        draft.saving = true;
        draft.resulted = false;
        draft.error = false;
        break;
      case SAVE_INSPIRATION_SUCCESS:
        draft.inspirations = '';
        draft.saving = false;
        draft.resulted = true;
        break;
      case SAVE_INSPIRATION_FAILURE:
        draft.saving = false;
        draft.resulted = true;
        draft.error = true;
        break;
      case RESET_INSPIRATION:
        draft.inspirations = initialState.inspirations;
        draft.saving = initialState.saving;
        draft.resulted = initialState.resulted;
        draft.error = initialState.error;
        break;
    }
  });

export default newInspirationReducer;
export { initialState, domainKey };

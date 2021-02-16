import produce from 'immer';
import newInspirationReducer from '../reducer';
import {
  changeInspiration,
  saveInspiration,
  saveInspirationSuccess,
  saveInspirationFailure,
  resetInspiration,
} from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('newInspirationReducer', () => {
  let state;
  const initialState = {
    inspiration: '',
    saving: false,
    resulted: false,
    error: false,
  };
  beforeEach(() => {
    state = { ...initialState };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(newInspirationReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle saveInspiration action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.saving = true;
      draft.resulted = false;
      draft.error = false;
    });
    expect(newInspirationReducer(state, saveInspiration())).toEqual(expectedResult);
  });

  it('should handle saveInspirationSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.inspiration = '';
      draft.saving = false;
      draft.resulted = true;
    });
    expect(newInspirationReducer(state, saveInspirationSuccess())).toEqual(
      expectedResult,
    );
  });

  it('should handle saveInspirationFailure action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.saving = false;
      draft.resulted = true;
      draft.error = true;
    });
    expect(newInspirationReducer(state, saveInspirationFailure())).toEqual(
      expectedResult,
    );
  });

  it('should handle resetInspiration action correctly', () => {
    state.inspiration = 'hi';
    state.saving = true;
    state.resulted = true;
    state.error = true;
    const expectedResult = produce(state, draft => {
      draft.inspiration = initialState.inspiration;
      draft.saving = initialState.saving;
      draft.resulted = initialState.resulted;
      draft.error = initialState.error;
    });
    expect(newInspirationReducer(state, resetInspiration())).toEqual(expectedResult);
  });

  describe('changeInspiration action', () => {
    it('should update inspiration if currently not in saving state', () => {
      const inspiration = 'cool';
      const expectedResult = produce(state, draft => {
        draft.inspiration = inspiration;
        draft.resulted = false;
        draft.error = false;
      });
      expect(newInspirationReducer(state, changeInspiration(inspiration))).toEqual(
        expectedResult,
      );
    });

    it('should not update inspiration if currently in saving state', () => {
      state.saving = true;
      const inspiration = 'cool';
      const expectedResult = produce(state, () => {});
      expect(newInspirationReducer(state, changeInspiration(inspiration))).toEqual(
        expectedResult,
      );
    });
  });
});
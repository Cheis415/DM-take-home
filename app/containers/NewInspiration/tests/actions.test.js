import {
  changeInspiraton,
  resetInspiraton,
  saveInspiraton,
  saveInspiratonSuccess,
  saveInspiratonFailure,
} from '../actions';
import {
  CHANGE_INSPIRATION,
  SAVE_INSPIRATION,
  SAVE_INSPIRATION_SUCCESS,
  SAVE_INSPIRATION_FAILURE,
  RESET_INSPIRATION,
} from '../constants';

describe('NewInspiration actions', () => {
  describe('changeInspiration Action', () => {
    it('has a type of CHANGE_INSPIRATION and passes through inspiration property', () => {
      const inspiration = 'hello';
      const expected = {
        type: CHANGE_INSPIRATION,
        inspiration,
      };
      expect(changeInspiration(inspiration)).toEqual(expected);
    });
  });

  describe('resetInspiration Action', () => {
    it('has a type of RESET_INSPIRATION', () => {
      const expected = {
        type: RESET_INSPIRATION,
      };
      expect(resetInspiration()).toEqual(expected);
    });
  });

  describe('saveInspiration Action', () => {
    it('has a type of SAVE_INSPIRATION', () => {
      const expected = {
        type: SAVE_INSPIRATION,
      };
      expect(saveInspiration()).toEqual(expected);
    });
  });

  describe('saveInspirationSuccess Action', () => {
    it('has a type of SAVE_INSPIRATION_SUCCESS', () => {
      const response = { inspiration: 'If you cant handle me at my worst...' };
      const expected = {
        type: SAVE_INSPIRATION_SUCCESS,
        response,
      };
      expect(saveInspirationSuccess(response)).toEqual(expected);
    });
  });

  describe('saveInspirationFailure Action', () => {
    it('has a type of SAVE_INSPIRATION_FAILURE and passes through error', () => {
      const error = 'error message';
      const expected = {
        type: SAVE_INSPIRATION_FAILURE,
        error,
      };
      expect(saveInspiratonFailure(error)).toEqual(expected);
    });
  });
});

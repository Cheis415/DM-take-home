/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { take, select, fork, cancel, call, put } from 'redux-saga/effects';
import { cloneableGenerator, createMockTask } from '@redux-saga/testing-utils';
import newInspirationSaga, { attemptToPost } from '../saga';
import {
  SAVE_INSPIRATION,
  SAVE_INSPIRATION_SUCCESS,
  SAVE_INSPIRATION_FAILURE,
  RESET_INSPIRATION,
} from '../constants';
import { selectInspiration } from '../selectors';
import {
  saveInspiration,
  resetInspiration,
  saveInspirationSuccess,
  saveInspirationFailure,
} from '../actions';
import * as API from '../../../utils/API';

describe('attemptToPost Saga', () => {
  const inspiration = 'sweet';
  const attemptToPostGenerator = cloneableGenerator(attemptToPost)(inspiration);

  it('should call API.addNewInspiration with inspiration passed as param to saga', () => {
    const callDescriptor = attemptToPostGenerator.next().value;
    expect(callDescriptor).toEqual(call(API.addNewInspiration, inspiration));
  });

  it('If inspiration posted successfully, should dispatch saveInspirationSucces action', () => {
    const clonedGenerator = attemptToPostGenerator.clone();
    const response = { inspiration: 'sweet' };
    const putDescriptor = clonedGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(saveInspirationSuccess(response)));
  });

  it('If inspiration posting failed, should dispatch saveInspirationFailure action', () => {
    const clonedGenerator = attemptToPostGenerator.clone();
    const response = new Error('Inspiration Failed to Save');
    const putDescriptor = clonedGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(saveInspirationFailure(response)));
  });
});

describe('newInspirationSaga Saga', () => {
  const newInspirationsGenerator = cloneableGenerator(newInspirationSaga)();
  const mockTask = createMockTask();

  it('should wait for SAVE_INSPIRATION action', () => {
    const takeDescriptor = newInspirationGenerator.next().value;
    expect(takeDescriptor).toEqual(take(SAVE_INSPIRATION));
  });

  it('should then select inspiration from store', () => {
    const mockAction = saveInspiration();
    const selectDescriptor = newInspirationGenerator.next(mockAction).value;
    expect(selectDescriptor).toEqual(select(selectInspiration));
  });

  it('should then fork attemptToPost saga with selected inspiration', () => {
    const inspiration = 'hi';
    const forkDescriptor = newInspirationGenerator.next(inspiration).value;
    expect(forkDescriptor).toEqual(fork(attemptToPost, inspiration));
  });

  it('should then wait for first action of RESET_INSPIRATION, SAVE_INSPIRATION_FAILURE, SAVE_INSPIRATION_SUCCESS.', () => {
    const takeDescriptor = newInspirationGenerator.next(mockTask).value;
    expect(takeDescriptor).toEqual(
      take([RESET_INSPIRATION, SAVE_INSPIRATION_FAILURE, SAVE_INSPIRATION_SUCCESS]),
    );
  });

  describe('saga that cancels forked saga/task due to RESET_INSPIRATION', () => {
    let clonedGenerator;
    beforeAll(() => {
      clonedGenerator = newInspirationGenerator.clone();
    });

    it('should cancel the forked saga if next action is RESET_INSPIRATION', () => {
      const mockResetAction = resetInspiration();
      const cancelDescriptor = clonedGenerator.next(mockResetAction).value;
      expect(cancelDescriptor).toEqual(cancel(mockTask));
    });

    it('should then loop back to wait for next SAVE_INSPIRATION action', () => {
      const takeDescriptor = clonedGenerator.next().value;
      expect(takeDescriptor).toEqual(take(SAVE_INSPIRATION));
    });
  });

  describe('saga that does not cancel forked saga/task', () => {
    let clonedGenerator;
    beforeEach(() => {
      clonedGenerator = newInspirationGenerator.clone();
    });

    it('Given action SAVE_INSPIRATION_SUCCESS, should then loop back to wait for next SAVE_INSPIRATION action', () => {
      const mockSuccessAction = saveInspirationSuccess();
      const takeDescriptor = clonedGenerator.next(mockSuccessAction).value;
      expect(takeDescriptor).toEqual(take(SAVE_INSPIRATION));
    });

    it('Given action SAVE_INSPIRATION_FAILURE, should then loop back to wait for next SAVE_INSPIRATION action', () => {
      const mockFailureAction = saveInspirationFailure();
      const takeDescriptor = clonedGenerator.next(mockFailureAction).value;
      expect(takeDescriptor).toEqual(take(SAVE_INSPIRATION));
    });
  });
});

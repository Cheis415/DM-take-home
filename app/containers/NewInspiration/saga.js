import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import {
  SAVE_INSPIRATION,
  SAVE_INSPIRATION_FAILURE,
  RESET_INSPIRATION,
  SAVE_INSPIRATION_SUCCESS,
} from './constants';
import { saveInspirationSuccess, saveInspirationFailure } from './actions';
import { selectInspiration } from './selectors';
import * as API from '../../utils/API';

/**
 * Sagas are middleware that handles side effects, from things like data fetching and
 * impure things like accessing the browser cache easier to manage, more efficient
 * to execute, easy to test, and better at handling failures.
 */

// Individual exports for testing
export default function* newInspirationSaga() {
  while (true) {
    yield take(SAVE_INSPIRATION);
    const inspirations = yield select(selectInspiration);
    const task = yield fork(attemptToPost, inspirations);
    const action = yield take([
      RESET_INSPIRATION,
      SAVE_INSPIRATION_FAILURE,
      SAVE_INSPIRATION_SUCCESS,
    ]);
    if (action.type === RESET_INSPIRATION) {
      yield cancel(task);
    }
    // end blocking. Now can listen again for SAVE_INSPIRATION
  }
}

export function* attemptToPost(inspirations) {
  try {
    const response = yield call(API.addNewInspiration, inspirations);
    yield put(saveInspirationSuccess(response));
  } catch (error) {
    yield put(saveInspirationFailure(error));
  }
}

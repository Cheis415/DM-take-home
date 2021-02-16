import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_INSPIRATION } from './constants';
import { fetchInspirationSuccess, fetchInspirationFailure } from './actions';
import * as API from '../../utils/API';

/**
 *
 * Sagas are middleware that handles side effects, from things like data fetching and
 * impure things like accessing the browser cache easier to manage, more efficient
 * to execute, easy to test, and better at handling failures.
 *
 * use takelatest so we don't have to fetch all making the process more efficient
 */

export default function* homePageSaga() {
  yield takeLatest(FETCH_INSPIRATION, fetchInspirationSaga);
}

function* fetchInspirationSaga() {
  try {
    const inspiration = yield call(API.getInspiration);
    yield put(fetchInspirationSuccess(inspiration));
  } catch (error) {
    yield put(fetchInspirationFailure());
  }
}

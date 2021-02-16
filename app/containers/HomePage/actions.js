/*
 *
 * HomePage actions
 *
 * Action types imported from constants
 *
 * The payload is passed through whenever the action is triggered
 *
 */

import {
  FETCH_INSPIRATION,
  FETCH_INSPIRATION_SUCCESS,
  FETCH_INSPIRATION_FAILURE,
} from './constants';

export function fetchInspiration() {
  return {
    type: FETCH_INSPIRATION,
  };
}

export function fetchInspirationSuccess(inspiration) {
  return {
    type: FETCH_INSPIRATION_SUCCESS,
    inspiration,
  };
}

export function fetchInspirationFailure(error) {
  return {
    type: FETCH_INSPIRATION_FAILURE,
    error,
  };
}

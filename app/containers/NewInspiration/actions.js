/*
 *
 * NewInspiration actions
 *
 * Action types imported from constants
 *
 * The payload is passed through whenever the action is triggered
 *
 */

import {
  CHANGE_INSPIRATION,
  SAVE_INSPIRATION,
  SAVE_INSPIRATION_SUCCESS,
  SAVE_INSPIRATION_FAILURE,
  RESET_INSPIRATION,
} from './constants';

export function changeInspiration(inspirations) {
  return {
    type: CHANGE_INSPIRATION,
    inspirations,
  };
}

export function saveInspiration() {
  return {
    type: SAVE_INSPIRATION,
  };
}

export function saveInspirationSuccess(response) {
  return {
    type: SAVE_INSPIRATION_SUCCESS,
    response,
  };
}

export function saveInspirationFailure(error) {
  return {
    type: SAVE_INSPIRATION_FAILURE,
    error,
  };
}

export function resetInspiration() {
  return {
    type: RESET_INSPIRATION,
  };
}

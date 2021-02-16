import { createSelector } from 'reselect';
import { initialState, domainKey } from './reducer';

/**
 * Reselect is a library which is used for creating memoized selectors. This is just a fancy way of saying 
 * that it caches the results of a function for a certain input. It is most commonly used with Redux, and 
 * the term “selector” is often used in the Redux ecosystem, referring to how one selects a portion of the 
 * Redux state.

A selector can compute any set of derived data based on any arbitrary input, memoizing the function’s result 
for later use. It will recompute the result whenever any of the inputs to the function change. This is very 
handy for two reasons:

              1. Expensive operations are only executed when they need to be, which helps with computation 
              performance.
              
              2. Since the results are cached, referential equality is preserved on subsequent calls of the 
              memoized function. Then, when the results of the memoized selector are used as props for another 
              component, React will know it doesn’t need to re-render the sub-component.
*/

/**
 * Direct selector to the inspiration state domain
 */

const selectNewInspirationDomain = state => state[domainKey] || initialState;

/**
 * Other specific selectors
 */

const selectInspiration = createSelector(
  selectNewInspirationDomain,
  newInspiration => newInspiration.inspirations,
);

const makeSelectInspiration = () =>
  createSelector(
    selectNewInspirationDomain,
    newInspiration => newInspiration.inspirations,
  );

const makeSelectSaving = () =>
  createSelector(
    selectNewInspirationDomain,
    newInspiration => newInspiration.saving,
  );

const makeSelectResulted = () =>
  createSelector(
    selectNewInspirationDomain,
    newInspiration => newInspiration.resulted,
  );

const makeSelectError = () =>
  createSelector(
    selectNewInspirationDomain,
    newInspiration => newInspiration.error,
  );

/**
 * Default selector used by NewInspiration
 */

const makeSelectNewInspiration = () =>
  createSelector(
    selectNewInspirationDomain,
    substate => substate,
  );

export default makeSelectNewInspiration;
export {
  selectNewInspirationDomain,
  selectInspiration,
  makeSelectInspiration,
  makeSelectSaving,
  makeSelectResulted,
  makeSelectError,
};

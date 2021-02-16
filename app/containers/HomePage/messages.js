/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomePage';

export default defineMessages({
  header: {
    id: `${scope}.header_message`,
    defaultMessage: 'Welcome! Prepare to be inspired!',
  },

  fetchSuccess: {
    id: `${scope}.successfully_fetched`,
    defaultMessage: 'Inspiration up to date!',
  },
  fetchFailure: {
    id: `${scope}.unsuccessful`,
    defaultMessage: 'Problem finding inspiration. Please try again.',
  },
});

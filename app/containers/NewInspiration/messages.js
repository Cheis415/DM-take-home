/*
 * Inspiration Messages
 *
 * This contains all the text for the NewInspiration container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.NewInspiration';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Provide some inspiration on this page!',
  },
  label: {
    id: `${scope}.label`,
    defaultMessage: 'Give some inspiration: ',
  },
});

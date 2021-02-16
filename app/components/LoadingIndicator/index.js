/**
 *
 * LoadingIndicator
 *
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function LoadingIndicator() {
  return <FontAwesomeIcon icon={faSpinner} spin size="lg" />;
}

export default LoadingIndicator;

/**
 *
 * Feedback
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../LoadingIndicator';
import Alert from '../Alert';
import Wrapper from './Wrapper';

function Feedback({ loading, resulted, error, successMessage, errorMessage }) {
  let content;
  if (loading) {
    content = <LoadingIndicator />;
  } else if (resulted && !error) {
    content = <Alert type="success" message={successMessage} />;
  } else if (resulted && error) {
    content = <Alert type="error" message={errorMessage} />;
  }
  return <Wrapper>{content}</Wrapper>;
}

Feedback.propTypes = {
  loading: PropTypes.bool.isRequired,
  resulted: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default Feedback;

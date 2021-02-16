/**
 *
 * Alert
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';

function Alert({ type, message }) {
  return <Wrapper success={type === 'success'}>{message}</Wrapper>;
}

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  message: PropTypes.string.isRequired,
};

export default Alert;

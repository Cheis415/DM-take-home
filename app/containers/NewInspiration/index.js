/**
 *
 * NewInspiration
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  changeInspiration,
  saveInspiration,
  resetInspiration,
} from './actions';
import {
  makeSelectInspiration,
  makeSelectSaving,
  makeSelectResulted,
  makeSelectError,
} from './selectors';
import reducer, { domainKey } from './reducer';
import saga from './saga';
import messages from './messages';
import Form from './Form';
import Input from './Input';
import AppContainer from '../../components/AppContainer';
import Button from '../../components/Button';
import Feedback from '../../components/Feedback';

const key = domainKey;

export function NewInspiration({
  inspirations,
  saving,
  resulted,
  error,
  onChangeInspiration,
  onSubmitForm,
  onUnmount,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => onUnmount, []);

  return (
    <AppContainer>
      <Helmet>
        <title>Give some inspiration</title>
        <meta name="description" content="Give some inspiration on this page" />
      </Helmet>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
      <section>
        <Form onSubmit={onSubmitForm} data-testid="inspirationForm">
          <label htmlFor="inspirations">
            <FormattedMessage {...messages.label} />
            <Input
              id="inspirations"
              type="text"
              placeholder="Write here..."
              disabled={saving}
              value={inspirations}
              onChange={onChangeInspiration}
            />
          </label>
          <Button type="submit" disabled={saving}>
            Submit Inspiration
          </Button>
        </Form>
        <Feedback
          loading={saving}
          resulted={resulted}
          error={error}
          successMessage="Saved inspiration Successfully!"
          errorMessage="There was a problem saving your inspirational quote. Please try again."
        />
      </section>
    </AppContainer>
  );
}

NewInspiration.propTypes = {
  inspirations: PropTypes.string.isRequired,
  saving: PropTypes.bool.isRequired,
  resulted: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  onChangeInspiration: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  inspirations: makeSelectInspiration(),
  saving: makeSelectSaving(),
  resulted: makeSelectResulted(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeInspiration: evt => dispatch(changeInspiration(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(saveInspiration());
    },
    onUnmount: () => dispatch(resetInspiration()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(NewInspiration);

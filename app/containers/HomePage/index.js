/**
 *
 * HomePage
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
import { fetchInspiration } from './actions';
import {
  makeSelectInspiration,
  makeSelectFetching,
  makeSelectResulted,
  makeSelectError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Feedback from '../../components/Feedback';
import InspirationList from '../../components/InspirationList';
import AppContainer from '../../components/AppContainer';
import Button from '../../components/Button';

const key = 'home';

export function HomePage({
  inspirations,
  fetching,
  resulted,
  error,
  fetchInspirationFromAPI,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    fetchInspirationFromAPI();
  }, []);

  let inspirationListSection;
  if (resulted && !error && inspirations.length === 0) {
    inspirationListSection = (
      <h3>There is no inspiration yet. Start inspiring!</h3>
    );
  } else if (inspirations.length > 0) {
    inspirationListSection = <InspirationList inspirations={inspirations} />;
  }

  return (
    <AppContainer>
      <Helmet>
        <title>Inspiration</title>
        <meta name="description" content="See all the inspiration here!" />
      </Helmet>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
      <section>
        <Button
          type="button"
          onClick={fetchInspirationFromAPI}
          disabled={fetching}
        >
          Refresh list of inspiration
        </Button>
        <Feedback
          loading={fetching}
          resulted={resulted}
          error={error}
          successMessage="Inspiration station up to date!"
          errorMessage="Problem fetching inspiration. Please try again."
        />
        {inspirationListSection}
      </section>
    </AppContainer>
  );
}

HomePage.propTypes = {
  inspirations: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetching: PropTypes.bool.isRequired,
  resulted: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  fetchInspirationFromAPI: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  inspirations: makeSelectInspiration(),
  fetching: makeSelectFetching(),
  resulted: makeSelectResulted(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchInspirationFromAPI: () => dispatch(fetchInspiration()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);

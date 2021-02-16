import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Wrapper from './Wrapper';
import StyledNavLink from './StyledNavLink';

function NavBar() {
  return (
    <Wrapper>
      <StyledNavLink exact to="/">
        <FormattedMessage {...messages.homeLinkMessage} />
      </StyledNavLink>
      <StyledNavLink exact to="/new">
        <FormattedMessage {...messages.newTidbitLinkMessage} />
      </StyledNavLink>
    </Wrapper>
  );
}

NavBar.propTypes = {};

export default NavBar;

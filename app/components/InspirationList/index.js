import React, { memo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import InspirationListItem from '../InspirationListItem';

function InspirationList({ inspirations }) {
  return (
    <Wrapper>
      {inspirations.map(inspirationString => (
        <InspirationListItem key={uuidv4()}>
          {inspirationString}
        </InspirationListItem>
      ))}
    </Wrapper>
  );
}

InspirationList.propTypes = {
  inspirations: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default memo(InspirationList);

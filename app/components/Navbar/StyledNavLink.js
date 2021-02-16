import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 0 5px;
  border-radius: 5px;
  color: black;
  letter-spacing: 1px;
  &:hover:not(.active) {
    text-decoration: underline;
  }
  &.active {
    background-color: #168bf2;
    color: white;
  }
`;

export default StyledNavLink;

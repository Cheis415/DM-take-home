import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  margin: auto;
  width: 300px;
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 3px;
  background-color: ${props => (props.success ? '#00de3b' : '#f21616')};
`;

export default Wrapper;

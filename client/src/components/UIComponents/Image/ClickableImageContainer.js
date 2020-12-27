import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ClickableImageContainer = styled(Link)`
  display: block;
  width: 70px;
  height: 70px;
  overflow: hidden;
  border-radius: 10px;
`;

export default ClickableImageContainer
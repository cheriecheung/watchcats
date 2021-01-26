import PropTypes from 'prop-types';
import styled from 'styled-components';
import { themeColor, themeEffect } from '../../../style/theme';

const LoadingMask = styled.button`
  position: absolute; 
  top: 15px;
  left: 35%;
  z-index: 5;
  display: flex;
  justify-content: center;
  padding: 0 10px;
  min-width: 120px;
  height: 35px;
  background: #fff; 
  outline: none !important;
  border: none;
  border-radius: 10px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1) !important;

  & > div  {
    transition: ${themeEffect.transition};
  }

  &:hover{
    & > div {
      color: ${themeColor.peach};
    }
  }
`

export default LoadingMask;

LoadingMask.propTypes = {
  loading: PropTypes.bool,
};

LoadingMask.defaultProps = {
  loading: undefined,
};
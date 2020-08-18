import React from 'react';
import { themeColor } from '../../style/theme';
import styled from 'styled-components';

const ResetButton = styled.button`
  border: none;
  background: none;
  outline: none;
  margin-right: 20px;
`;

const SaveButton = styled.input`
  background: ${themeColor.peach};
  border: none;
  outline: none;
  padding: 5px 25px;
  border-radius: 15px;
  color: #fff;
  height: 35px;
  font-weight: 600;
`;

export default function FormButtons({ onClick }) {
  const handleReset = (resetFunction) => {
    if (window.confirm('Click Ok to confirm to reset')) {
      resetFunction();
    }
  };

  return (
    <div className="float-right">
      <ResetButton onClick={() => handleReset(onClick)}>Reset</ResetButton>
      <SaveButton value="Save" type="submit" />
    </div>
  );
}

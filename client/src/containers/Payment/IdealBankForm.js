import React from 'react';
import { IdealBankElement } from '@stripe/react-stripe-js';
import '../../style/IdealBankSectionStyles.css';

const options = {
  // Custom styling can be passed to options when creating an Element
  style: {
    base: {
      padding: '10px 12px',
      color: '#32325d',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
  },
};

function IdealBankForm() {
  return (
    <label>
      <h6 style={{ marginBottom: 15 }}>iDEAL Bank</h6>
      <IdealBankElement className="IdealBankElement" options={options} />
    </label>
  );
}

export default IdealBankForm;

import React from 'react';
import Item from './Item';
import IdealBankForm from './IdealBankForm';

function Payment() {
  return (
    <div style={{ maxWidth: 900, margin: '50px auto', textAlign: 'left' }}>
      <Item />
      <hr style={{ margin: '30px 0' }} />
      <IdealBankForm />
    </div>
  );
}

export default Payment;

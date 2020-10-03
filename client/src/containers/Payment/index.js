import React, { useEffect } from 'react';
import Item from './Item';
import IdealBankForm from './IdealBankForm';
import { getPaymentIntent } from '../../_actions/paymentActions';
import { useStripe, useElements, IdealBankElement } from '@stripe/react-stripe-js';

import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

function Payment() {
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();
  const methods = useForm();
  const { register, handleSubmit, watch, reset } = methods;

  useEffect(() => {
    dispatch(getPaymentIntent(3));
  }, [dispatch]);

  const onSubmit = (data) => console.log(data);

  return (
    <div style={{ maxWidth: 900, margin: '50px auto', textAlign: 'left' }}>
      <Item />
      <hr style={{ margin: '30px 0' }} />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <IdealBankForm />

          <br />
          <br />

          <button type="submit" disabled={!stripe} className="IdealBankPayButton">
            Pay
          </button>
        </form>
      </FormProvider>
    </div>
  );
}

export default Payment;

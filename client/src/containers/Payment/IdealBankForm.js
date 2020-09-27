import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentIntent } from '../../_actions/paymentActions';
import { useStripe, useElements, IdealBankElement } from '@stripe/react-stripe-js';
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
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <h6 style={{ marginBottom: 15 }}>iDEAL Bank</h6>
          <IdealBankElement className="IdealBankElement" options={options} />
        </label>

        <br />
        <br />

        <button type="submit" disabled={!stripe} className="IdealBankPayButton">
          Pay
        </button>
      </form>
    </FormProvider>
  );
}

export default IdealBankForm;

import React, { useEffect, useState } from 'react';
import Item from './Item';
import IdealBankForm from './IdealBankForm';
import { getPaymentIntent } from '../../_actions/paymentActions';
import { useStripe, useElements, IdealBankElement } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = (accountId) =>
  loadStripe(process.env.REACT_APP_STRIPE_API_KEY, {
    stripeAccount: accountId,
  });

function Payment() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.payment);

  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (data) {
      const { client_secret, stripeAccountId } = data || {};
      setClientSecret(client_secret);
      console.log({ stripeAccountId });
    }
  }, [data]);

  useEffect(() => {
    dispatch(getPaymentIntent(3));
  }, [dispatch]);

  return (
    <Elements stripe={stripePromise('acct_1HYCiyART4JEToPd')}>
      <CheckoutForm clientSecret={clientSecret} />
    </Elements>
  );
}

export default Payment;

function CheckoutForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const idealBank = elements.getElement(IdealBankElement);

    const result = await stripe.confirmIdealPayment(clientSecret, {
      payment_method: {
        ideal: idealBank,
        billing_details: {
          name: 'Cat Owner Name',
        },
      },

      return_url: 'https://localhost:3000/checkout/complete',
    });

    if (result.error) {
      console.log({ error: result.error });
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        //https://stripe.com/docs/connect/enable-payment-acceptance-guide
        alert('success');
      }
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '50px auto', textAlign: 'left' }}>
      <Item />
      <hr style={{ margin: '30px 0' }} />

      <form onSubmit={handleSubmit}>
        <IdealBankForm />

        <br />
        <br />

        <button type="submit" disabled={!stripe} className="IdealBankPayButton">
          Pay
        </button>
      </form>
    </div>
  );
}

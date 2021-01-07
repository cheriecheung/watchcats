import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentIntent } from '../../redux/payment/actions';
import {
  useStripe,
  useElements,
  Elements,
  IdealBankElement
} from '@stripe/react-stripe-js';

const dropDownStyle = {
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

function useCheckout() {
  const { t } = useTranslation();

  const { bookingId } = useLocation().state || {};

  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();
  const { paymentIntent } = useSelector((state) => state.payment);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    dispatch(getPaymentIntent(bookingId));
  }, []);

  useEffect(() => {
    if (paymentIntent) {
      const { client_secret } = paymentIntent;
      setClientSecret(client_secret);
    }
  }, [paymentIntent]);

  async function onSubmit(e) {
    e.preventDefault();

    if (!stripe || !elements) return;

    const idealBank = elements.getElement(IdealBankElement);

    const result = await stripe.confirmIdealPayment(clientSecret, {
      payment_method: {
        ideal: idealBank,
        // billing_details: {
        //   name: 'Cat Owner Name',
        // },
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

  return {
    t,
    stripe,
    IdealBankElement,
    dropDownStyle,
    onSubmit,
  }
}

function usePaymentElements() {
  const { stripeAccountId } = useLocation().state || {};

  return {
    stripeAccountId,
    Elements,
  }
}

export { useCheckout, usePaymentElements }
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBooking } from '../../redux/bookings/actions';
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

  const { id } = useParams();

  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();
  const { bookingInfo } = useSelector((state) => state.bookings);
  const { clientSecret } = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(getPaymentIntent(id));
    dispatch(getBooking((id)));
  }, []);

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
    bookingInfo,
    stripe,
    IdealBankElement,
    dropDownStyle,
    onSubmit,
  }
}

function usePaymentElements() {
  const { stripeAccountId } = useSelector((state) => state.payment);

  return {
    stripeAccountId,
    Elements,
  }
}

export { useCheckout, usePaymentElements }
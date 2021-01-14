import React from 'react';
import '../../style/IdealBankSectionStyles.css';
import { loadStripe } from '@stripe/stripe-js';
import ItemContent from '../Bookings/components/ItemContent';
import { useCheckout, usePaymentElements } from './viewModel'

function CheckoutForm() {
  const {
    t,
    bookingInfo,
    bookingType,
    stripe,
    IdealBankElement,
    dropDownStyle,
    onSubmit
  } = useCheckout();

  return (
    <div style={{ maxWidth: 900, margin: '50px auto', textAlign: 'left' }}>
      <ItemContent
        t={t}
        data={bookingInfo}
        bookingType={bookingType}
      />

      <hr style={{ margin: '30px 0' }} />

      <form onSubmit={onSubmit}>
        <label>
          <h6 style={{ marginBottom: 15 }}>iDEAL Bank</h6>
          <IdealBankElement className="IdealBankElement" options={dropDownStyle} />
        </label>

        <br />
        <br />

        <button type="submit" disabled={!stripe} className="IdealBankPayButton">
          {t('pay.title')}
        </button>
      </form>
    </div>
  );
}

const stripePromise = (accountId) =>
  loadStripe(process.env.REACT_APP_STRIPE_API_KEY, { stripeAccount: accountId });

function Payment() {
  const { Elements, stripeAccountId } = usePaymentElements();

  return (
    <Elements stripe={stripePromise(stripeAccountId)}>
      <CheckoutForm />
    </Elements>
  );
}

export default Payment;
import React from 'react';
import '../../style/IdealBankSectionStyles.css';
import { loadStripe } from '@stripe/stripe-js';
import { VerticalCard } from '../../components/UIComponents';
import ItemContent from '../Bookings/components/ItemContent';
import { useCheckout, usePaymentElements } from './viewModel';
import styled from 'styled-components';

const Container = styled.div`
  text-align: left;
  max-width: 500px;
  margin: 30px auto 40px auto; 

  @media (max-width: 680px) {
    width: 90vw;
  }
`

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
    <Container>
      <span>{t('pay.description')}</span>
      <VerticalCard style={{ margin: '20px auto', overflow: 'visible' }}>
        <ItemContent
          t={t}
          data={bookingInfo}
          bookingType={bookingType}
        />

        <hr style={{ margin: '30px 0' }} />

        <form onSubmit={onSubmit}>
          <h6 style={{ marginBottom: 15 }}>iDEAL Bank</h6>
          <IdealBankElement className="IdealBankElement" options={dropDownStyle} />

          <br />
          <button
            type="submit"
            disabled={!stripe}
            className="IdealBankPayButton"
          >
            {t('pay.title')}
          </button>
        </form>
      </VerticalCard>
    </Container>
  );
}

const stripePromise = (accountId) =>
  loadStripe(process.env.REACT_APP_STRIPE_API_KEY, { stripeAccount: 'acct_1ICP3rEe1CrV89UE' });

// const stripePromise = (accountId) =>
//   loadStripe('pk_test_51IByMcB3WNgtRVtUXc51cW8O02IDwbrFjQDkOqxJs6qSg0lXeT65wFOIjMnH9cADsqkINTDtskWfRZuUiACfR2sf00jRfg37pf', { stripeAccount: 'acct_1ICP3rEe1CrV89UE ' });

function Payment() {
  const { Elements, stripeAccountId } = usePaymentElements();
  console.log({ stripeAccountId })
  return (
    <Elements stripe={stripePromise(stripeAccountId)}>
      <CheckoutForm />
    </Elements>
  );
}

export default Payment;
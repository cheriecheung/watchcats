import React from 'react';
import { ContainedButton } from '../../../components/UIComponents'
import { onboardUser } from '../../../redux/actions/paymentActions';
import { useDispatch } from 'react-redux';

function PaymentSetup({ t }) {
    const dispatch = useDispatch();

    return (
        <>
            <p>To send and / or receive payments, please set up payouts on Stripe. Clicking below will guide you to a secure online form which will guide you to connect your bank account.</p>

            <ContainedButton type="button" onClick={() => dispatch(onboardUser())}>Set up payouts</ContainedButton>
        </>
    )
}

export default PaymentSetup
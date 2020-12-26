import React from 'react';
import { ContainedButton, WrapLayout } from '../../../../components/UIComponents'
import { onboardUser } from '../../../../redux/payment/actions';
import { useDispatch } from 'react-redux';

function PaymentSetup({ t }) {
    const dispatch = useDispatch();

    return (
        <WrapLayout variant="settings">
            <p>{t('settings.payment_description')}</p>

            <ContainedButton type="button" onClick={() => dispatch(onboardUser())}>
                {t('settings.setup_payouts')}
            </ContainedButton>
        </WrapLayout>
    )
}

export default PaymentSetup
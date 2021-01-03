import React from 'react';
import { ContainedButton, Spinner, WrapLayout } from '../../../../components/UIComponents'

function PaymentSetup({
    t,
    isLoading,
    paymentSetupProps
}) {
    const {
        hasSetUpStripAccount,
        onHandleOnboardUser,
        onOpenStripeLoginPage
    } = paymentSetupProps

    return (
        <WrapLayout variant="settings">
            <p>{t('settings.payment_description')}</p>

            {hasSetUpStripAccount ?
                <ContainedButton type="button" onClick={onOpenStripeLoginPage}>
                    {t('settings.edit_account')}
                </ContainedButton>
                :
                <ContainedButton type="button" onClick={onHandleOnboardUser}>
                    {t('settings.setup_payouts')}
                    {isLoading && <Spinner />}
                </ContainedButton>
            }
        </WrapLayout>
    )
}

export default PaymentSetup
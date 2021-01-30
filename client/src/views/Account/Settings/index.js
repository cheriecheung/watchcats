import React from 'react';
import {
    CardTitle,
    HorizontalCard,
    Remark,
    Tooltip
} from '../../../components/UIComponents'
import ContactDetails from './ContactDetails'
import PaymentSetup from './PaymentSetup'
import Authentication from './Authentication';
import {
    useAuthentication,
    useContactDetails,
    usePaymentSetup,
    useSettings
} from './viewModel'

function Settings() {
    const {
        t,
        appError,
        accountError,
        hasSetEmailNotificationError,
        hasSetPhoneNotificationError,
        isLoadingChangePassword,
        isLoadingDisable2fa,
        isLoadingEnable2fa,
        isLoadingSendSmsOtp,
        isLoadingSetPayouts,
        isLoadingSubmitPhoneNumber,
        isLoadingVerifyPhoneNumber
    } = useSettings()

    const contactDetailsProps = useContactDetails();
    const paymentSetupProps = usePaymentSetup();
    const authenticationProps = useAuthentication();
    const { isGoogleLogin } = authenticationProps || {}

    return (
        <>
            <HorizontalCard style={{ width: '100%' }}>
                <CardTitle>
                    {t('settings.contact_details')}
                    <Tooltip content={t('settings.contact_details_tooltip')} />
                </CardTitle>
                <ContactDetails
                    t={t}
                    accountError={accountError}
                    contactDetailsProps={contactDetailsProps}
                    hasSetEmailNotificationError={hasSetEmailNotificationError}
                    hasSetPhoneNotificationError={hasSetPhoneNotificationError}
                    isLoadingSendSmsOtp={isLoadingSendSmsOtp}
                    isLoadingSubmitPhoneNumber={isLoadingSubmitPhoneNumber}
                    isLoadingVerifyPhoneNumber={isLoadingVerifyPhoneNumber}
                />
            </HorizontalCard>

            <HorizontalCard>
                <CardTitle>{t('settings.stripe_account')}</CardTitle>
                <PaymentSetup
                    t={t}
                    isLoading={isLoadingSetPayouts}
                    paymentSetupProps={paymentSetupProps}
                />
            </HorizontalCard>

            <HorizontalCard>
                <CardTitle style={{ marginBottom: 0 }}>
                    {t('settings.authentication')}
                </CardTitle>

                {isGoogleLogin && <Remark>({t('settings.not_available')}) </Remark>}

                <br />
                <Authentication
                    t={t}
                    appError={appError}
                    authenticationProps={authenticationProps}
                    isLoadingChangePassword={isLoadingChangePassword}
                    isLoadingDisable2fa={isLoadingDisable2fa}
                    isLoadingEnable2fa={isLoadingEnable2fa}
                />
            </HorizontalCard>
        </>
    );
}

export default Settings;

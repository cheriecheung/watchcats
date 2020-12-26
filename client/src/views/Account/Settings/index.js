import React from 'react';
import { CardTitle, HorizontalCard } from '../../../components/UIComponents'

import ContactDetails from './ContactDetails'
import PaymentSetup from './PaymentSetup'
import Authentication from './Authentication';

import { useContactDetails, useAuthentication } from './viewModel'

function Settings() {
    const contactDetailsProps = useContactDetails();
    const { t } = contactDetailsProps
    const authenticationProps = useAuthentication();

    return (
        <>
            <HorizontalCard style={{ width: '100%' }}>
                <CardTitle>{t('settings.contact_details')}</CardTitle>
                <ContactDetails
                    contactDetailsProps={contactDetailsProps}
                />
            </HorizontalCard>

            <HorizontalCard>
                {/* give redirecting loading notice */}
                <CardTitle>{t('settings.stripe_account')}</CardTitle>
                <PaymentSetup t={t} />
            </HorizontalCard>

            <HorizontalCard>
                <CardTitle style={{ marginBottom: 0 }}>
                    {t('settings.authentication')}
                </CardTitle>
                <p style={{ fontSize: '0.9rem' }}>
                    ({t('settings.not_available')})
                </p>

                <Authentication
                    authenticationProps={authenticationProps}
                />
            </HorizontalCard>
        </>
    );
}

export default Settings;

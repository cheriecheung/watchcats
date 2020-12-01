import React from 'react';
import { CardTitle, HorizontalCard } from '../../../components/UIComponents'

import ContactDetails from './ContactDetails'
import PaymentSetup from './PaymentSetup'
import PasswordAndAuthentication from './PasswordAndAuthentication';

import { useContactDetails, usePasswordAndAuthentication } from './viewModel'

function Settings() {
    const contactDetailsProps = useContactDetails();

    const passwordAndAuthenticationProps = usePasswordAndAuthentication();

    return (
        <>
            <HorizontalCard style={{ width: '100%' }}>
                <CardTitle>Contact Details</CardTitle>
                <ContactDetails
                    contactDetailsProps={contactDetailsProps}
                />
            </HorizontalCard>

            <HorizontalCard>
                {/* give redirecting loading notice */}
                <CardTitle>Stripe Account</CardTitle>
                <PaymentSetup />
            </HorizontalCard>

            <HorizontalCard>
                <CardTitle>Password and Authentication</CardTitle>
                <PasswordAndAuthentication
                    passwordAndAuthenticationProps={passwordAndAuthenticationProps}
                />
            </HorizontalCard>
        </>
    );
}

export default Settings;

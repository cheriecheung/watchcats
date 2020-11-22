import React from 'react';
import { useTranslation } from 'react-i18next';
import { CardTitle, HorizontalCard } from '../../../components/UIComponents'

import ContactDetails from './ContactDetails'
import PaymentSetup from './PaymentSetup'
import PasswordAndAuthentication from './PasswordAndAuthentication';

import { useSettings } from './viewModel'

function Settings() {
    const { t } = useTranslation();

    const { contactDetails, isActivated, contactDetailsProps, phoneNumberInputProps, phoneVerificationProps } = useSettings();

    return (
        <>
            <HorizontalCard>
                <CardTitle>Contact Details</CardTitle>
                <ContactDetails
                    contactDetailsProps={contactDetailsProps}
                    phoneNumberInputProps={phoneNumberInputProps}
                    phoneVerificationProps={phoneVerificationProps}
                />
            </HorizontalCard>

            <HorizontalCard>
                {/* give redirecting loading notice */}
                <CardTitle>Stripe Account</CardTitle>
                <PaymentSetup />
            </HorizontalCard>

            <HorizontalCard>
                <CardTitle>Password and Authentication</CardTitle>
                <PasswordAndAuthentication contactDetails={contactDetails} isActivated={isActivated} />
            </HorizontalCard>
        </>
    );
}

export default Settings;

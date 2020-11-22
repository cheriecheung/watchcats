import React from 'react';
import { useTranslation } from 'react-i18next';
import { SectionContainer } from '../../../components/FormComponents';
import { CardTitle } from '../../../components/UIComponents'

import ContactDetails from './ContactDetails'
import PaymentSetup from './PaymentSetup'
import PasswordAndAuthentication from './PasswordAndAuthentication';

import { useSettings } from './viewModel'

function Settings() {
    const { t } = useTranslation();

    const { contactDetails, isActivated, contactDetailsProps, phoneNumberInputProps, phoneVerificationProps } = useSettings();

    return (
        <>
            <SectionContainer>
                <CardTitle>Contact Details</CardTitle>
                <ContactDetails
                    contactDetailsProps={contactDetailsProps}
                    phoneNumberInputProps={phoneNumberInputProps}
                    phoneVerificationProps={phoneVerificationProps}
                />
            </SectionContainer>

            <SectionContainer>
                {/* give redirecting loading notice */}
                <CardTitle>Stripe Account</CardTitle>
                <PaymentSetup />
            </SectionContainer>

            <SectionContainer>
                <CardTitle>Password and Authentication</CardTitle>
                <PasswordAndAuthentication contactDetails={contactDetails} isActivated={isActivated} />
            </SectionContainer>
        </>
    );
}

export default Settings;

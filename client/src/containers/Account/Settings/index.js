import React from 'react';
import { useTranslation } from 'react-i18next';
import { SectionContainer, SectionTitle } from '../../../components/FormComponents';

import ContactDetails from './ContactDetails'
import PaymentSetup from './PaymentSetup'
import PasswordAndAuthentication from './PasswordAndAuthentication';

import { useSettings } from './viewModel'

function Settings() {
    const { t } = useTranslation();

    const { modalProps, contactDetailsProps, phoneNumberInputProps, phoneVerificationProps } = useSettings();

    return (
        <>
            <SectionContainer>
                <SectionTitle>Contact Details</SectionTitle>
                <ContactDetails
                    modalProps={modalProps}
                    contactDetailsProps={contactDetailsProps}
                    phoneNumberInputProps={phoneNumberInputProps}
                    phoneVerificationProps={phoneVerificationProps}
                />
            </SectionContainer>

            <SectionContainer>
                {/* give redirecting loading notice */}
                <SectionTitle>Stripe Account</SectionTitle>
                <PaymentSetup />
            </SectionContainer>

            <SectionContainer>
                <SectionTitle>Password and Authentication</SectionTitle>
                <PasswordAndAuthentication modalProps={modalProps} />
            </SectionContainer>
        </>
    );
}

export default Settings;

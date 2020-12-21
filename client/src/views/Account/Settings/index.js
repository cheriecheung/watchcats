import React from 'react';
import { CardTitle, HorizontalCard, Tooltip } from '../../../components/UIComponents'

import ContactDetails from './ContactDetails'
import PaymentSetup from './PaymentSetup'
import Authentication from './Authentication';

import { useContactDetails, useAuthentication } from './viewModel'

function Settings() {
    const contactDetailsProps = useContactDetails();

    const authenticationProps = useAuthentication();

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
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <CardTitle>
                        Authentication

                        <Tooltip content="Not available for accounts login via Google">
                            <i className="fas fa-info-circle ml-2" style={{ alignSelf: 'center' }} />
                        </Tooltip>
                    </CardTitle>

                </div>
                <Authentication
                    authenticationProps={authenticationProps}
                />
            </HorizontalCard>
        </>
    );
}

export default Settings;

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'antd';
import { SectionContainer, SectionTitle } from '../../../components/FormComponents';

import ContactDetails from './ContactDetails'
import PaymentSetup from './PaymentSetup'
import PasswordAndAuthentication from './PasswordAndAuthentication';

const defaultModal = {
    show: false,
    loading: false,
    title: '',
    content: '',
}

function Settings() {
    const { t } = useTranslation();

    const [modal, setModal] = useState(defaultModal);

    return (
        <>
            <Modal
                centered
                title={modal.title}
                visible={modal.show}
                // okText="Confirm"
                //  onOk={() => setModal({ show: false })}
                onCancel={() => setModal({ show: false })}
                footer={null}
            >
                {modal.content}
            </Modal>

            <SectionContainer>
                <SectionTitle>Contact Details</SectionTitle>
                <ContactDetails
                    setModal={(title, content) => setModal({ show: true, title, content })}
                />
            </SectionContainer>

            <SectionContainer>
                {/* give redirecting loading notice */}
                <SectionTitle>Stripe Account</SectionTitle>
                <PaymentSetup />
            </SectionContainer>

            <SectionContainer>
                <SectionTitle>Password and Authentication</SectionTitle>
                <PasswordAndAuthentication
                    setModal={(title, content) => setModal({ show: true, title, content })}
                    closeModal={() => setModal({ show: false })}
                />
            </SectionContainer>
        </>
    );
}

export default Settings;

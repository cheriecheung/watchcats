import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'antd';
import { SectionContainer, SectionTitle } from '../../../components/FormComponents';

import ContactDetails from './ContactDetails'
import PaymentSetup from './PaymentSetup'
import PasswordAndAuthentication from './PasswordAndAuthentication';

function Settings() {
    const { t } = useTranslation();

    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [modalContent, setModalContent] = useState('')

    useEffect(() => {
        console.log({ modalTitle, modalContent })
        if (modalTitle && modalContent) {
            setShowModal(true)
        }
    }, [modalTitle, modalContent])

    return (
        <>
            <Modal
                centered
                title={modalTitle}
                visible={showModal}
                // okText="Confirm"
                //  onOk={() => setModal({ show: false })}
                onCancel={() => setShowModal(false)}
                footer={null}
            >
                {modalContent}
            </Modal>

            <SectionContainer>
                <SectionTitle>Contact Details</SectionTitle>
                <ContactDetails
                    setModalTitle={setModalTitle}
                    setModalContent={setModalContent}
                    closeModal={() => setShowModal(false)}
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
                    setModalTitle={setModalTitle}
                    setModalContent={setModalContent}
                    closeModal={() => setShowModal(false)}
                />
            </SectionContainer>
        </>
    );
}

export default Settings;

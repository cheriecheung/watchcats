import React, { useState } from 'react';
import { Col, Label, Input } from 'reactstrap';
import { Modal, Input as AntInput } from 'antd';
import { SectionContainer, SectionTitle } from '../../../components/FormComponents';
import valid from 'card-validator';
import { useTranslation } from 'react-i18next';

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

            {/* <SectionContainer>
                <SectionTitle>{t('settings.payment_method')}</SectionTitle>
                <Col style={{ paddingLeft: 0 }}>
                    <button
                        className="add-field-btn"
                        style={{ width: 200 }}
                        onClick={() =>
                            setModal({
                                ...modal,
                                show: true,
                                title: t('settings.add_card'),
                            })
                        }
                    >
                        <i className="fas fa-plus mr-1" />
                        {t('settings.add_card')}
                    </button>
                </Col>
                <Col style={{ paddingLeft: 0, marginTop: 10 }}>
                    <button
                        className="add-field-btn"
                        style={{ width: 200 }}
                        onClick={() =>
                            setModal({
                                ...modal,
                                show: true,
                                title: 'Add bank account',
                            })
                        }
                    >
                        <i className="fas fa-plus mr-1" />
                        {t('settings.add_bank_account')}
                    </button>
                </Col>
                <Modal
                    title={modal.title}
                    visible={modal.show}
                    onOk={handleOk}
                    confirmLoading={modal.loading}
                    onCancel={() => setModal({ ...modal, show: false })}
                >
                    {modal.loading ? <h4>loading...</h4> : renderModalContent()}
                </Modal>
            </SectionContainer> */}

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

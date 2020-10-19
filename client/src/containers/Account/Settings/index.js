import React, { useState } from 'react';
import { Col, Label, Input } from 'reactstrap';
import { Modal, Input as AntInput } from 'antd';
import { SectionContainer, SectionTitle } from '../../../components/FormComponents';
import valid from 'card-validator';
import { useTranslation } from 'react-i18next';

import ContactDetails from './ContactDetails'
import PaymentSetup from './PaymentSetup'
import PasswordAndAuthentication from './PasswordAndAuthentication';

function Settings() {
    const { t } = useTranslation();

    const [modal, setModal] = useState({
        show: false,
        loading: false,
        title: '',
        content: '',
    });
    const [cardType, setCardType] = useState('');

    const handleOk = () => {
        setModal({ ...modal, loading: true });
        setTimeout(() => {
            setModal({ ...modal, show: false, loading: false });
        }, 2000);
    };

    const handleCardNumber = (e) => {
        const numberValidation = valid.number(e.target.value);
        if (!numberValidation.isPotentiallyValid) {
            console.log('its incorrect');
        }

        if (numberValidation.card) {
            console.log({ numberValidation });
            setCardType(numberValidation.card.type);
        }

        if (e.target.value === '') {
            setCardType('');
        }
    };

    const handleCardExpiryMonth = (e) => {
        const monthValidation = valid.expirationMonth(e.target.value);

        console.log({ monthValidation });
        // if (!dateValidation.isPotentiallyValid) {
        //   console.log('its incorrect');
        // }

        // if (numberValidation.card) {
        //   console.log({ numberValidation });
        //   setCardType(numberValidation.card.type);
        // }
    };

    const handleCardExpiryYear = (e) => {
        const yearValidation = valid.expirationYear(e.target.value);

        console.log({ yearValidation });
    };

    const handleCardCvv = (e) => {
        const cvvValidation = valid.cvv(e.target.value);

        console.log({ cvvValidation });
    };

    const renderCardIcon = () => {
        return cardType === '' ? (
            <i className="far fa-credit-card mr-1" />
        ) : (
                <img src={require(`../../../assets/images/paymentMethods/${cardType}.png`)} width={20} />
            );
    };

    const renderModalContent = () => {
        return modal.title === 'Add credit / debit card' ? (
            <div style={{ textAlign: 'left' }} className="credit-card-input">
                <Label>{t('settings.card_number')}</Label>
                <AntInput type="text" onChange={handleCardNumber} prefix={renderCardIcon()} />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 20,
                    }}
                >
                    <div style={{ width: '30%' }}>
                        <Label>{t('settings.expiry_date')}</Label>
                        <Input type="text" placeholder="MM" onChange={handleCardExpiryMonth} />
                    </div>
                    <div style={{ width: '30%' }}>
                        <Label style={{ visibility: 'hidden' }}>Expiry date</Label>
                        <Input type="text" placeholder="YY" onChange={handleCardExpiryYear} />
                    </div>
                    <div style={{ width: '30%' }}>
                        <Label>CVV</Label>
                        <Input type="text" onChange={handleCardCvv} />
                    </div>
                </div>
            </div>
        ) : (
                <h4>helo bank account</h4>
            );
    };

    return (
        <>
            <SectionContainer>
                <SectionTitle>Contact Details</SectionTitle>
                <ContactDetails />
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
                <PasswordAndAuthentication />
            </SectionContainer>
        </>
    );
}

export default Settings;

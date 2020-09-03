import React, { useState } from 'react';
import { Row, Col, Label, Input, Button } from 'reactstrap';
import { Modal, Input as AntInput } from 'antd';
import { TextField, SectionContainer } from '../../components/FormComponents';
import valid from 'card-validator';
import { themeColor } from '../../style/theme';
import { useTranslation } from 'react-i18next';

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
      <img src={require(`../../assets/images/paymentMethods/${cardType}.png`)} width={20} />
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

  const color = themeColor.green;

  return (
    <>
      <SectionContainer>
        <h6 style={{ color, fontWeight: 800 }}>{t('settings.payment_method')}</h6>
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
      </SectionContainer>

      <SectionContainer>
        <h6 style={{ color, fontWeight: 800 }}> {t('settings.change_password')}</h6>
        <Row>
          <Col md={4} className="mb-3">
            <Label> {t('settings.current_password')}</Label>
            <AntInput.Password />
          </Col>
          <Col md={4} className="mb-3">
            <Label> {t('settings.new_password')}</Label>
            <AntInput.Password />
          </Col>
          <Col md={4} className="mb-3">
            <Label> {t('settings.repeat_new_password')}</Label>
            <AntInput.Password />
          </Col>
        </Row>
        <Button color="info" size="sm">
          {t('settings.change_password')}
        </Button>
      </SectionContainer>

      {/* <SectionContainer>
        <h6 style={{ color, fontWeight: 800 }}>Change email</h6>
        <span style={{ marginBottom: 30 }}>
          Your email address will not change until you confirm it via email.
        </span>
        <Row>
          <Col md={4} className="mb-3">
            <Label>New email</Label>
            <Input type="text" />
          </Col>
          <Col md={4} className="mb-3">
            <Label>Confirm new email</Label>
            <Input type="text" />
          </Col>
          <Col md={4} className="mb-3">
            <Label>Password</Label>
            <Input type="text" />
          </Col>
        </Row>
        <Button color="info" size="sm">
          Change email
        </Button>
      </SectionContainer> */}

      <SectionContainer>
        <h6 style={{ color, fontWeight: 800 }}> {t('settings.two_factor_auth')}</h6>
        <p>
          Protect your account with an extra layer of security. Once configured, you'll be required
          to enter both your password and an authentication code from your mobile phone in order to
          sign in
        </p>
      </SectionContainer>

      <SectionContainer>
        <h6 style={{ color: 'red', fontWeight: 800 }}>Delete account</h6>
        <Button color="danger" size="sm" style={{ borderRadius: 10 }}>
          Delete account
        </Button>
      </SectionContainer>
    </>
  );
}

export default Settings;

import React, { useState } from 'react';
import { Row, Col, Label, Input, Button } from 'reactstrap';
import { Modal, Input as AntInput } from 'antd';
import { TextField, SectionContainer } from '../../components/FormComponents';
import valid from 'card-validator';
import { themeColor } from '../../style/theme';

function Settings() {
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
      <i class="far fa-credit-card mr-1"></i>
    ) : (
      <img
        src={require(`../../assets/images/paymentMethods/${cardType}.png`)}
        width={20}
      />
    );
  };

  const renderModalContent = () => {
    return modal.title === 'Add credit / debit card' ? (
      <div style={{ textAlign: 'left' }} className="credit-card-input">
        <Label>Card number</Label>
        <AntInput
          type="text"
          onChange={handleCardNumber}
          prefix={renderCardIcon()}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 20,
          }}
        >
          <div style={{ width: '30%' }}>
            <Label>Expiry date</Label>
            <Input
              type="text"
              placeholder="MM"
              onChange={handleCardExpiryMonth}
            />
          </div>
          <div style={{ width: '30%' }}>
            <Label style={{ visibility: 'hidden' }}>Expiry date</Label>
            <Input
              type="text"
              placeholder="YY"
              onChange={handleCardExpiryYear}
            />
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
        <h6 style={{ color, fontWeight: 800 }}>Payment Method</h6>
        <Col style={{ paddingLeft: 0 }}>
          <button
            className="add-field-btn"
            style={{ width: 200 }}
            onClick={() =>
              setModal({
                ...modal,
                show: true,
                title: 'Add credit / debit card',
              })
            }
          >
            <i class="fas fa-plus mr-1" />
            Add credit / debit card
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
            <i class="fas fa-plus mr-1" />
            Add bank account
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
        <h6 style={{ color, fontWeight: 800 }}>Change password</h6>
        <Row>
          <Col md={6} className="mb-3">
            <Label>Current password</Label>
            <AntInput.Password />
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Label>New password</Label>
            <AntInput.Password />
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Label>Repeat new password</Label>
            <AntInput.Password />
          </Col>
        </Row>
        <Button color="info" size="sm">
          Change password
        </Button>
      </SectionContainer>

      <SectionContainer>
        <h6 style={{ color, fontWeight: 800 }}>Change email</h6>
        <Row>
          <Col md={6} className="mb-3">
            <Label>New email</Label>
            <Input type="text" />
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Label>Confirm new email</Label>
            <Input type="text" />
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Label>Password</Label>
            <Input type="text" />
          </Col>
        </Row>
        <Button color="info" size="sm">
          Change email
        </Button>
        <span style={{ marginLeft: 10 }}>
          Your email address will not change until you confirm it via email.
        </span>
      </SectionContainer>

      <SectionContainer>
        <h6 style={{ color, fontWeight: 800 }}>Two-factor authentication</h6>
        <p>
          Protect your account with an extra layer of security. Once configured,
          you'll be required to enter both your password and an authentication
          code from your mobile phone in order to sign in
        </p>
      </SectionContainer>

      <SectionContainer>
        <h6 style={{ color, fontWeight: 800 }}>Delete account</h6>
        <Button color="danger" size="sm">
          Delete account
        </Button>
      </SectionContainer>
    </>
  );
}

export default Settings;

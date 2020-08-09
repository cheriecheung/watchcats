import React, { useState } from 'react';
import { Row, Col, Label, Input, Button } from 'reactstrap';
import { Modal, Input as AntInput } from 'antd';
import valid from 'card-validator';
import styled from 'styled-components';

const Section = styled.div`
  text-align: left;
  margin-bottom: 40px;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  padding: 15px 20px;
`;

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
      <Row style={{ textAlign: 'left' }}>
        <Col md={12} className="mb-3">
          <Label>Card number</Label>
          <AntInput
            type="text"
            onChange={handleCardNumber}
            prefix={renderCardIcon()}
          />
        </Col>
        <Col md={4}>
          <Label>Expiry date</Label>
          <Input
            type="text"
            placeholder="MM"
            onChange={handleCardExpiryMonth}
          />
        </Col>
        <Col md={4}>
          <Label style={{ visibility: 'hidden' }}>Expiry date</Label>
          <Input type="text" placeholder="YY" onChange={handleCardExpiryYear} />
        </Col>
        <Col md={4}>
          <Label>CVV</Label>
          <Input type="text" onChange={handleCardCvv} />
        </Col>
      </Row>
    ) : (
      <h4>helo bank account</h4>
    );
  };

  return (
    <>
      <Section>
        <h5>Payment Method</h5>
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
      </Section>

      <Section>
        <h5>Change password</h5>
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
      </Section>

      <Section>
        <h5>Change email</h5>
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
      </Section>

      <Section>
        <h5>Two-factor authentication</h5>
        <p>
          Protect your account with an extra layer of security. Once configured,
          you'll be required to enter both your password and an authentication
          code from your mobile phone in order to sign in
        </p>
      </Section>

      <Section>
        <h5>Delete account</h5>
        <Button color="danger" size="sm">
          Delete account
        </Button>
      </Section>
    </>
  );
}

export default Settings;

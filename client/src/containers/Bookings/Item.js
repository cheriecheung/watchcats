import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';

const cardHeight = 140;

const Container = styled.div`
  height: ${cardHeight};
  text-align: left;
  padding: 20px;
  margin-bottom: 40px;
  border-radius: 10px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.05), 0 1px 6px rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 1);
  overflow: visible;
`;

const Item = ({ data, renderActionButtons }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div
          style={{
            width: cardHeight,
            height: cardHeight,
            marginLeft: -20,
            borderBottomRightRadius: 10,
            borderTopRightRadius: 10,
            overflow: 'hidden',
          }}
        >
          <img
            src="https://images.pexels.com/photos/569170/pexels-photo-569170.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="pic"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </div>

        <div
          style={{
            height: cardHeight,
            width: '60%',
            paddingLeft: 20,
          }}
        >
          <Row>
            <Col md={3}>{t('bookings.owner')}:</Col>
            <Col md={6}>Kaitlynn C</Col>
          </Row>
          <Row>
            <Col md={3}>{t('bookings.location')}:</Col>
            <Col md={6}>1025EE, Amsterdam Noord</Col>
          </Row>
          <Row>
            <Col md={3}>
              <span>{t('bookings.time')}:</span>
            </Col>
            <Col md={6}>
              <span>25 AUG 2020, 11:00 - 13:00</span>
            </Col>
          </Row>
          <Row>
            <Col md={3}>{t('bookings.price')}:</Col>
            <Col md={6}>€ 26, 00</Col>
          </Row>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
          <Link to="/profile">{t('bookings.view_profile')}</Link>
          <Link to="/messages">{t('bookings.view_conversation')}</Link>
        </div>
      </div>

      {renderActionButtons && renderActionButtons()}
    </Container>
  );
};

export default Item;

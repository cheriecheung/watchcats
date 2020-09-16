import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

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

const Item = ({ data, renderSection, bookingType }) => {
  const { t } = useTranslation();

  useEffect(() => {
    console.log({ data });
  }, [data]);

  const { name, shortId, appointmentType, location, price } = data;
  const profileUrl =
    bookingType === 'sitting_jobs'
      ? `/profile/catowner/${shortId}`
      : `/profile/catsitter/${shortId}`;

  const formattedDate = (date) => moment(date).format('DD MMM YYYY');
  const formattedTime = (time) => moment(time).format('HH:mm');

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
            <Col md={3}>
              {bookingType === 'sitting_jobs' ? t('bookings.owner') : t('bookings.sitter')}:
            </Col>
            <Col md={6}>{name}</Col>
          </Row>
          <Row>
            <Col md={3}>{t('bookings.location')}:</Col>
            <Col md={6}>{location}</Col>
          </Row>
          <Row>
            <Col md={3}>
              <span>{t('bookings.time')}:</span>
            </Col>
            <Col md={6}>
              {appointmentType === 'oneDay' ? (
                <span>
                  {formattedDate(data.startDate)} - {formattedDate(data.endDate)}
                </span>
              ) : (
                <span>
                  {formattedDate(data.date)}, {formattedTime(data.startTime)} -
                  {formattedTime(data.endTime)}
                </span>
              )}
            </Col>
          </Row>
          <Row>
            <Col md={3}>{t('bookings.price')}:</Col>
            <Col md={6}>€ {price}, 00</Col>
          </Row>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
          <a href={profileUrl} target="_blank" style={{ float: 'right' }}>
            {t('bookings.view_profile')}
          </a>
          <a href={`/messages/${shortId}`} target="_blank" style={{ float: 'right' }}>
            {t('bookings.view_conversation')}
          </a>
        </div>
      </div>

      {renderSection && renderSection()}
    </Container>
  );
};

export default Item;

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'reactstrap';
import { SectionContainer } from '../../components/FormComponents';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// const cardHeight = 160;

const ResultContainer = styled.div`
  text-align: left;
  margin-bottom: 25px;
  border-radius: 10px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.05), 0 1px 6px rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  display: flex;
  padding: 20px;
`;

const fiveStarDisplay = (number) => {
  return (
    <>
      <i className="fas fa-star icon-sort-review" />
      <i className="fas fa-star icon-sort-review" />
      <i className="fas fa-star icon-sort-review" />
      <i className="fas fa-star icon-sort-review" />
      <i className="fas fa-star icon-sort-review" />
      <span className="ml-1">
        {number} {number === 1 ? 'Review' : 'Reviews'}
      </span>
    </>
  );
};

function Result({ item }) {
  const { t } = useTranslation();

  const {
    id,
    name,
    image,
    distance,
    price,
    totalReviews,
    totalCompletedBookings,
    totalRepeatedCustomers,
    description,
  } = item;

  return (
    <div>
      <ResultContainer>
        <div
          style={{
            //maxHeight: 150,
            flexBasis: '26%',
            margin: '0 15px 0 -20px',
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            overflow: 'hidden',
          }}
        >
          <img
            src={image}
            alt="pic"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </div>
        <div
          style={{
            flexBasis: '75%',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <h5>{name}</h5>
            <div>
              <div>
                <i className="fas fa-map-marker-alt icon-sort-distance" />
                <span>{distance}</span>
              </div>
              <div>
                <i className="fas fa-euro-sign icon-sort-price" />
                <span>{price} / booking</span>
              </div>
            </div>
          </div>
          {/* <div className="mb-2">
                  <span className="mr-2">Verified by: </span>
                  <i className="fas fa-address-card icon-verified" />
                  <i className="fas fa-home icon-verified" />
                  <i className="fas fa-phone icon-verified" />
                  <i className="fab fa-facebook-square icon-verified" />
                </div> */}

          <Row>
            {totalReviews > 0 ? (
              <Col md={4} style={{ minWidth: 200 }} className="mb-1">
                {fiveStarDisplay(totalReviews)}
              </Col>
            ) : (
              <Col md={4} style={{ minWidth: 200, color: '#00C68E' }} className="mb-1">
                <i className="fas fa-user-plus mr-2" />
                <span>{t('find_sitter.new_member')}</span>
              </Col>
            )}
          </Row>

          <Row>
            <Col
              md={4}
              style={{
                margin: 0,
                minWidth: 200,
                color: '#00C68E',
                visibility: totalCompletedBookings > 0 ? 'visible' : 'hidden',
              }}
            >
              <i className="far fa-calendar-alt mr-2" />
              <span>
                {totalCompletedBookings} {t('find_sitter.completed_bookings')}
              </span>
            </Col>
            <Col
              style={{
                minWidth: 200,
                color: '#00C68E',
                visibility: totalRepeatedCustomers > 0 ? 'visible' : 'hidden',
              }}
            >
              <i className="fas fa-redo-alt mr-2" />
              <span>
                {totalRepeatedCustomers} {t('find_sitter.repeated_customers')}
              </span>
            </Col>
          </Row>
          <hr style={{ margin: '10px 0' }} />
          <p style={{ margin: 0, padding: 0 }}>{description}</p>

          {/* href={`/profile/catsitter/${id}`} */}
          <a href="/profile/catsitter/123" target="_blank" style={{ float: 'right' }}>
            {t('find_sitter.view_profile')}
          </a>
        </div>
      </ResultContainer>
    </div>
  );
}

export default Result;

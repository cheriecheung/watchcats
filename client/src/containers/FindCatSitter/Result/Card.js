import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'reactstrap';
import { SectionContainer } from '../../../components/FormComponents';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import defaultProfilePic from '../../../assets/images/default_profile_pic.jpg'

// const cardHeight = 160;

const ResultContainer = styled.div`
  maxWidth: 400px;
  text-align: left;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.05), 0 1px 6px rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  display: flex;
  padding: 20px;
  transition: all .3s ease-in-out;
  height: 190px;

  &:hover {
    margin-left: 10px;
    margin-right: -10px;
  }
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

function Card({ item, setHoveredResultId }) {
  const { t } = useTranslation();

  const {
    urlId,
    firstName,
    lastName,
    profilePictureFileName,
    // distance,
    hourlyRate,
    nightlyRate,
    totalReviews,
    totalCompletedBookings,
    totalRepeatedCustomers,
    aboutSitter,
  } = item;

  const profilePicURL = profilePictureFileName ? `${process.env.REACT_APP_API_DOMAIN}/image/${profilePictureFileName}` : defaultProfilePic

  return (
    <ResultContainer
      onMouseOver={() => setHoveredResultId(urlId)}
      onMouseLeave={() => setHoveredResultId('')}
    >
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
          src={profilePicURL}
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
          <h5>{firstName} {lastName.charAt(0)}</h5>
          <div>
            {/* <div>
              <i className="fas fa-map-marker-alt icon-sort-distance" />
              <span>{distance}</span>
            </div> */}
            <div>
              {/* <i className="fas fa-euro-sign icon-sort-price" /> */}
              <span>&euro;	{hourlyRate} / hour</span>
            </div>
            <div>
              {/* <i className="fas fa-euro-sign icon-sort-price" /> */}
              <span>&euro;	{nightlyRate} / night</span>
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

        <div style={{ marginTop: -15, marginRight: 10, visibility: totalReviews > 0 ? 'visible' : 'hidden' }}>
          {fiveStarDisplay(totalReviews)}
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{ color: '#00C68E', marginRight: 10, visibility: totalCompletedBookings > 0 ? 'visible' : 'hidden' }}>
            <i className="far fa-calendar-alt mr-2" />
            <span>
              {totalCompletedBookings} {t('find_sitter.completed_bookings')}
            </span>
          </div>

          <div style={{ color: '#00C68E', visibility: totalRepeatedCustomers > 0 ? 'visible' : 'hidden' }}>
            <i className="fas fa-redo-alt mr-2" />
            <span>
              {totalRepeatedCustomers} {t('find_sitter.repeated_customers')}
            </span>
          </div>
        </div>

        <hr style={{ margin: '15px 0' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '80%', height: '50px', overflow: 'hidden' }}>{aboutSitter.slice(0, 100).trim().replace(/("[^"]+"|\w+)$/, "...")}</div>
          <a href={`/profile/catsitter/${urlId}`} target="_blank" style={{ width: '17%' }}>
            {t('find_sitter.view_profile')}
          </a>
        </div>
      </div>
    </ResultContainer>
  );
}

export default Card;

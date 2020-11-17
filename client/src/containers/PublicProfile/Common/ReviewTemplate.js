import React from 'react';
import defaultProfilePic from '../../../assets/images/default_profile_pic.jpg'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { EllipsisParagraph } from '../../../components/ProfileComponents'

const ImageContainer = styled(Link)`
  display: block;
  width: 70px;
  height: 70px;
  background: pink;
  overflow: hidden;
  border-radius: 10px;
`;

function ReviewTemplate({ review }) {
  const profilePicURL = review.reviewerPicture ? `${process.env.REACT_APP_API_DOMAIN}/image/${review.reviewerPicture}` : defaultProfilePic

  return (
    <div style={{ margin: '20px 0' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <ImageContainer
            to={`/profile/catsitter/${review.reviewerUrlId}`}
          >
            <img
              src={profilePicURL}
              alt="pic"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </ImageContainer>
        </div>

        <div style={{ marginLeft: 20 }}>
          <span>{review.reviewerName}</span>
          <br />
          {[...Array(review.rating).keys()].map((item, index) => {
            return (
              <i key={index} className="fas fa-star icon-sort-review" />
            )
          })}
          <p>
            <EllipsisParagraph>
              {review.content}
            </EllipsisParagraph>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReviewTemplate;

import React from 'react';
import defaultProfilePic from '../../../assets/images/default_profile_pic.jpg'
import { EllipsisParagraph, ImageContainerClickable } from '../../../components/UIComponents';

function ReviewTemplate({ review }) {
  const profilePicURL = review.reviewerPicture ? `${process.env.REACT_APP_API_DOMAIN}/image/${review.reviewerPicture}` : defaultProfilePic

  const pathname = window.location.pathname.includes('catsitter') ? `/profile/catowner/${review.reviewerUrlId}` : `/profile/catsitter/${review.reviewerUrlId}`

  return (
    <div style={{ margin: '20px 0' }}>
      <div style={{ display: 'flex' }}>
        <div>
          <ImageContainerClickable to={pathname}>
            <img
              src={profilePicURL}
              alt="pic"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </ImageContainerClickable>
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

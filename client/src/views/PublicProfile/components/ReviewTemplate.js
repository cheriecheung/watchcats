import React from 'react';
import defaultProfilePic from '../../../assets/images/default_profile_pic.jpg'
import { EllipsisParagraph, ClickableImageContainer, Image, LinkButton } from '../../../components/UIComponents';

function ReviewTemplate({ review }) {
  const profilePicURL = review.reviewerPicture ? `${process.env.REACT_APP_API_DOMAIN}/image/${review.reviewerPicture}` : defaultProfilePic

  const pathname = window.location.pathname.includes('catsitter') ? `/profile/catowner/${review.reviewerUrlId}` : `/profile/catsitter/${review.reviewerUrlId}`

  return (
    <div style={{ margin: '20px 0' }}>
      <div style={{ display: 'flex' }}>
        <div>
          <ClickableImageContainer to={pathname}>
            <Image url={profilePicURL} />
          </ClickableImageContainer>
        </div>

        <div style={{ marginLeft: 20 }}>
          <LinkButton to={pathname} style={{ fontWeight: 'bold' }}>
            {review.reviewerName}
          </LinkButton>
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

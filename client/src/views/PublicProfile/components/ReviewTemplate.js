import React from 'react';
import defaultProfilePic from '../../../assets/images/default_profile_pic.jpg'
import { EllipsisParagraph, ClickableImageContainer, Image, LinkButton } from '../../../components/UIComponents';

const { REACT_APP_API_DOMAIN } = process.env

function ReviewTemplate({ review }) {
  const {
    content,
    rating,
    reviewerPicture,
    reviewerUrlId,
    reviewerName,
  } = review

  const profilePicURL = reviewerPicture ?
    `${REACT_APP_API_DOMAIN}/image/${reviewerPicture}` :
    defaultProfilePic

  const pathname = window.location.pathname.includes('catsitter') ?
    `/profile/catowner/${reviewerUrlId}` :
    `/profile/catsitter/${reviewerUrlId}`

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
            {reviewerName}
          </LinkButton>
          <br />
          {[...Array(rating).keys()].map((item, index) => {
            return (
              <i key={index} className="fas fa-star icon-sort-review" />
            )
          })}

          <EllipsisParagraph>{content}</EllipsisParagraph>
        </div>
      </div>
    </div>
  );
}

export default ReviewTemplate;

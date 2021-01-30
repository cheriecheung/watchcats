import React from 'react';
import {
  EllipsisParagraph,
  ClickableImageContainer,
  Image,
  LinkButton
} from '../../../components/UIComponents';
import { formatDate } from '../../../utility';

function ReviewTemplate({ review }) {
  const {
    createdAt,
    content,
    rating,
    reviewerPicture,
    reviewerUrlId,
    reviewerName,
  } = review

  const pathname = window.location.pathname.includes('catsitter') ?
    `/profile/catowner/${reviewerUrlId}` :
    `/profile/catsitter/${reviewerUrlId}`

  return (
    <div style={{ margin: '20px 0' }}>
      <div style={{ display: 'flex' }}>
        <div>
          <ClickableImageContainer to={pathname}>
            <Image url={reviewerPicture} />
          </ClickableImageContainer>
        </div>

        <div style={{ marginLeft: 20 }}>
          <LinkButton to={pathname} style={{ fontWeight: 'bold' }}>
            {reviewerName}
          </LinkButton>
          <br />
          <span>{formatDate(createdAt, 'DD MMM YYYY')}</span>
          <br />
          {[...Array(rating).keys()].map((item, index) => <i key={index} className="fas fa-star icon-sort-review mb-3" />)}

          <EllipsisParagraph rows={1.5}>{content}</EllipsisParagraph>
        </div>
      </div>
    </div>
  );
}

export default ReviewTemplate;

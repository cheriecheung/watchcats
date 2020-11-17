import React from 'react';
import { List } from 'antd';
import ReviewTemplate from './ReviewTemplate';

const allReviews = [];
for (let i = 0; i < 23; i++) {
  allReviews.push({ id: i, name: `User ${i}` });
}

function Reviews({ reviews, scrollToRef, reviewListRef }) {
  console.log({ reviews })
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: () => scrollToRef(reviewListRef),
        pageSize: 3,
      }}
      dataSource={reviews}
      renderItem={(review) => <ReviewTemplate review={review} />}
    />
  );
}

export default Reviews;

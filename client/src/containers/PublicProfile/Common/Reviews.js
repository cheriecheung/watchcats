import React from 'react';
import { List } from 'antd';
import ReviewTemplate from './ReviewTemplate';

const allReviews = [];
for (let i = 0; i < 23; i++) {
  allReviews.push({ id: i, name: `User ${i}` });
}

function Reviews({ scrollToRef, reviewListRef }) {
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: () => scrollToRef(reviewListRef),
        pageSize: 3,
      }}
      dataSource={allReviews}
      renderItem={({ name }) => <ReviewTemplate name={name} />}
    />
  );
}

export default Reviews;

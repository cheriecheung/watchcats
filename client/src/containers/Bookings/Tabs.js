import React, { useState, useEffect } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Row, Col, Label, FormGroup, Input } from 'reactstrap';
import styled from 'styled-components';
import { Calendar } from 'antd';
import { Tabs as AntTabs } from 'antd';
const { TabPane } = AntTabs;

const Container = styled.div`
  text-align: left;
  margin: 0px 5%;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

function BookingTabs() {
  const [activeKey, setActiveKey] = useState('sitter');
  const [bookings, setBookings] = useState({});

  const {
    request = [],
    confirmed = [],
    completed = [],
    reviews = [],
  } = bookings;

  const bookingTypeTabs = [
    {
      key: 'requested',
      tab: `Requested (${request.length})`,
      content: <Requested bookings={request} />,
    },
    {
      key: 'confirmed',
      tab: `Confirmed (${confirmed.length})`,
      content: <Confirmed bookings={confirmed} />,
    },
    {
      key: 'completed',
      tab: `Completed (${completed.length})`,
      content: <Completed bookings={completed} />,
    },
    {
      key: 'reviews',
      tab: `Reviews (${reviews.length})`,
      content: <Reviews bookings={reviews} />,
    },
  ];

  const bookingTabs = [
    {
      key: 'sitter',
      tab: 'Cat sitter bookings',
      content: <SitterBookings bookingTypeTabs={bookingTypeTabs} />,
    },
    {
      key: 'owner',
      tab: 'Cat owner bookings',
      content: <OwnerBookings bookingTypeTabs={bookingTypeTabs} />,
    },
  ];

  const changeTab = (activeKey) => {
    setActiveKey(activeKey);
  };

  useEffect(() => {
    if (activeKey === 'sitter') {
      const sitterBookings = {
        request: [
          { name: 'Owner1', cat: 'Tom' },
          { name: 'Owner2', cat: 'Jerry' },
        ],
        confirmed: [{ name: 'Owner3', cat: 'Aiden' }],
        completed: [
          { name: 'Owner4', cat: 'Mary' },
          { name: 'Owner5', cat: 'Tom' },
          { name: 'Owner6', cat: 'Helena' },
          { name: 'Owner1', cat: 'Baby' },
        ],
        reviews: [
          { name: 'Owner4', cat: 'Mary' },
          { name: 'Owner6', cat: 'Helena' },
          { name: 'Owner1', cat: 'Baby' },
        ],
      };

      setBookings(sitterBookings);
    } else {
      const ownerBookings = {
        request: [{}, {}, {}],
        confirmed: [],
        completed: [{}],
        reviews: [{}],
      };

      setBookings(ownerBookings);
    }
  }, [activeKey]);

  return (
    <div style={{ display: 'flex', marginTop: 10 }}>
      <AntTabs
        defaultActiveKey="sitter"
        tabPosition="left"
        onChange={changeTab}
      >
        {bookingTabs.map(({ key, tab, content }) => (
          <TabPane tab={tab} key={key}>
            {content}
          </TabPane>
        ))}
      </AntTabs>
    </div>
  );
}

export default BookingTabs;

function SitterBookings({ bookingTypeTabs }) {
  return (
    <Container>
      <AntTabs defaultActiveKey="sitter" tabPosition="top">
        {bookingTypeTabs.map(({ key, tab, content }) => (
          <TabPane tab={tab} key={key}>
            {content}
          </TabPane>
        ))}
      </AntTabs>
    </Container>
  );
}

function OwnerBookings({ bookingTypeTabs }) {
  return (
    <Container>
      <AntTabs defaultActiveKey="sitter" tabPosition="top">
        {bookingTypeTabs.map(({ key, tab, content }) => (
          <TabPane tab={tab} key={key}>
            {content}
          </TabPane>
        ))}
      </AntTabs>
    </Container>
  );
}

function Requested({ bookings }) {
  return (
    <>
      {bookings.map(({ name, cat }, index) => {
        return (
          <div>
            <p>{index + 1}</p>
            <p>Owner: {name}</p>
            <p>Cat: {cat}</p>
            <hr />
          </div>
        );
      })}
    </>
  );
}

function Confirmed({ bookings }) {
  return (
    <>
      {bookings.map(({ name, cat }, index) => {
        return (
          <div>
            <p>{index + 1}</p>
            <p>Owner: {name}</p>
            <p>Cat: {cat}</p>
            <hr />
          </div>
        );
      })}
    </>
  );
}

function Completed({ bookings }) {
  return (
    <>
      {bookings.map(({ name, cat }, index) => {
        return (
          <div>
            <p>{index + 1}</p>
            <p>Owner: {name}</p>
            <p>Cat: {cat}</p>
            <hr />
          </div>
        );
      })}
    </>
  );
}

function Reviews({ bookings }) {
  return (
    <>
      {bookings.map(({ name, cat }, index) => {
        return (
          <div>
            <p>{index + 1}</p>
            <p>Owner: {name}</p>
            <p>Cat: {cat}</p>
            <hr />
          </div>
        );
      })}
    </>
  );
}

import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import ScreenWidthListener from '../../components/General/ScreenWidthListener';
import { sitterBookings } from '../../constants';

import { Tabs } from 'antd';
const { TabPane } = Tabs;

const Container = styled.div`
  text-align: left;
  margin: 0px 5%;
`;

function BookingTabs() {
  const { screenWidth } = ScreenWidthListener();
  const [tabPosition, setTabPosition] = useState('');

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
      tab: 'Sitting jobs for me',
      content: <SitterBookings bookingTypeTabs={bookingTypeTabs} />,
    },
    {
      key: 'owner',
      tab: 'Sitting service for my cat',
      content: <OwnerBookings bookingTypeTabs={bookingTypeTabs} />,
    },
  ];

  const changeTab = (activeKey) => {
    setActiveKey(activeKey);
  };

  useEffect(() => {
    if (activeKey === 'sitter') {
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

  useEffect(() => {
    if (screenWidth <= 930) {
      setTabPosition('top');
    } else {
      setTabPosition('left');
    }
  }, [screenWidth]);

  return (
    <div style={{ display: 'flex', marginTop: 10 }}>
      <Tabs
        defaultActiveKey="sitter"
        tabPosition={tabPosition}
        onChange={changeTab}
        className="vertical-tabs"
      >
        {bookingTabs.map(({ key, tab, content }) => (
          <TabPane tab={tab} key={key}>
            {content}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}
export default BookingTabs;

function SitterBookings({ bookingTypeTabs }) {
  return (
    <Container>
      <Tabs
        defaultActiveKey="sitter"
        tabPosition="top"
        className="horizontal-tabs"
      >
        {bookingTypeTabs.map(({ key, tab, content }) => (
          <TabPane tab={tab} key={key}>
            {content}
          </TabPane>
        ))}
      </Tabs>
    </Container>
  );
}

function OwnerBookings({ bookingTypeTabs }) {
  return (
    <Container>
      <Tabs
        defaultActiveKey="sitter"
        tabPosition="top"
        className="horizontal-tabs"
      >
        {bookingTypeTabs.map(({ key, tab, content }) => (
          <TabPane tab={tab} key={key}>
            {content}
          </TabPane>
        ))}
      </Tabs>
    </Container>
  );
}

function Requested({ bookings }) {
  return (
    <>
      {bookings.map(({ name, cat, email, phone, message }, index) => {
        return (
          <div>
            <b>Request No. {index + 1}</b>
            <p>Owner: {name}</p>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
            <p>Cat: {cat}</p>
            <p>Message: {message}</p>

            <Button variant="outline-primary" size="sm" className="mr-3">
              Invite to meet up before accepting request
            </Button>
            <Button variant="outline-success" size="sm" className="mr-3">
              Accept request
            </Button>
            <Button variant="outline-danger" size="sm" className="mr-3">
              Cancel request
            </Button>

            <hr />
          </div>
        );
      })}

      <br />
      <br />

      <p>
        Remark: It is highly recommended to have a meet up session between you
        and cat owners before accepting their requests. Directly accepting a
        request is meant for owners you have previously completed bookings with.
      </p>
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

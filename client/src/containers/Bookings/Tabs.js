import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Row, Col, Label, FormGroup, Input } from 'reactstrap';
import styled from 'styled-components';
import { Calendar } from 'antd';

const Container = styled.div`
  text-align: left;
  margin: 50px 9%;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

function BookingTabs() {
  const [key, setKey] = useState('requested');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="requested" title="Requested">
        <Container>
          <Requested />
        </Container>
      </Tab>
      <Tab eventKey="confirmed" title="Confirmed">
        <Container>
          <Confirmed />
        </Container>
      </Tab>
      <Tab eventKey="completed" title="Completed">
        <Container>
          <Completed />
        </Container>
      </Tab>
      <Tab eventKey="review" title="Reviews">
        <Container>
          <Reviews />
        </Container>
      </Tab>
    </Tabs>
  );
}

export default BookingTabs;

function Requested() {
  return <>Requested bookings</>;
}

function Confirmed() {
  return <>Confirmed bookings</>;
}

function Completed() {
  return <>Confirmed bookings</>;
}

function Reviews() {
  return <>Review</>;
}

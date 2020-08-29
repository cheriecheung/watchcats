import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import ScreenWidthListener from '../../components/General/ScreenWidthListener';
import { sitterBookings } from '../../constants';
import { Modal } from 'antd';

import { Tabs } from 'antd';
const { TabPane } = Tabs;

const Container = styled.div`
  text-align: left;
  margin: 0px 5%;
`;

const ActionButton = styled.button`
  border: 1px solid ${(props) => props.backgroundColor};
  border-radius: 15px;
  background-color: #fff;
  color: #494442;
  outline: none;
  padding: 0 15px;
  height: 30px;
  margin-right: 10px;
`;

const fiveStarDisplay = (number) => {
  return (
    <>
      <i className="fas fa-star icon-sort-review" />
      <i className="fas fa-star icon-sort-review" />
      <i className="fas fa-star icon-sort-review" />
      <i className="fas fa-star icon-sort-review" />
      <i className="fas fa-star icon-sort-review" />
      <span className="ml-1">{number}</span>
    </>
  );
};

const cardHeight = 140;

const ResultContainer = styled.div`
  height: ${cardHeight};
  text-align: left;
  padding: 20px;
  margin-bottom: 40px;
  border-radius: 10px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.05), 0 1px 6px rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 1);
  overflow: visible;
`;

function BookingTabs() {
  const { screenWidth } = ScreenWidthListener();
  const [tabPosition, setTabPosition] = useState('');

  const [activeKey, setActiveKey] = useState('sitter');
  const [bookings, setBookings] = useState({});

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(<h4>test</h4>);

  const { request = [], confirmed = [], completed = [], reviews = [] } = bookings;

  const bookingTypeTabs = [
    {
      key: 'requested',
      tab: `Requested (${request.length})`,
      content: <Requested bookings={request} openModal={() => setModalVisible(true)} />,
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

      <Modal
        //title=""
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
      >
        {modalContent}
      </Modal>
    </div>
  );
}
export default BookingTabs;

function SitterBookings({ bookingTypeTabs }) {
  return (
    <Container>
      <Tabs defaultActiveKey="sitter" tabPosition="top" className="horizontal-tabs">
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
      <Tabs defaultActiveKey="sitter" tabPosition="top" className="horizontal-tabs">
        {bookingTypeTabs.map(({ key, tab, content }) => (
          <TabPane tab={tab} key={key}>
            {content}
          </TabPane>
        ))}
      </Tabs>
    </Container>
  );
}

function Requested({ bookings, openModal }) {
  return (
    <>
      {bookings.map(({ name, cat, email, phone, message }, index) => {
        return (
          <ResultContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                style={{
                  width: cardHeight,
                  height: cardHeight,
                  marginLeft: -20,
                  borderBottomRightRadius: 10,
                  borderTopRightRadius: 10,
                  overflow: 'hidden',
                }}
              >
                <img
                  src="https://images.pexels.com/photos/569170/pexels-photo-569170.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="pic"
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>
              <div
                style={{
                  height: cardHeight,
                  width: '80%',
                  paddingLeft: 20,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 5,
                  }}
                >
                  <h5>Kaitlynn</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                    <Link to="/profile">View profile</Link>
                    <Link to="/messages">View conversation</Link>
                  </div>
                </div>

                <Row>
                  {/* <Col md={3}>Phone number:</Col>
                  <Col md={6}>+31 06 23477622</Col> */}
                  <Col md={3}>Area:</Col>
                  <Col md={6}>1025EE, Amsterdam Noord</Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
                  <Col md={3}>
                    <span>Sitter needed:</span>
                  </Col>
                  <Col md={6}>
                    <b
                      style={{
                        padding: '4px 10px',
                        background: '#ffecea',
                        borderRadius: 15,
                      }}
                    >
                      25-08-2020, 11:00 - 13:00
                    </b>
                  </Col>
                </Row>
              </div>
            </div>

            <div style={{ margin: '25px 0 30px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <i class="fas fa-quote-left" />
              </div>
              <p style={{ margin: '10px 0 0 0', padding: '0 15px' }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem aperiam neque rerum
                velit architecto! Veniam, atque! Neque repellendus dolor deserunt debitis obcaecati
                culpa ratione sed nesciunt numquam architecto beatae, molestias nemo voluptatum
                voluptas quos consequatur vero. Sit odit a eaque!
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <i class="fas fa-quote-right float-right" />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <ActionButton backgroundColor="#FFAE42">Invite to meet up first</ActionButton>
              <ActionButton backgroundColor="#FF5C4E">Reject</ActionButton>
              <ActionButton backgroundColor="#9ACD32" onClick={openModal}>
                Accept
              </ActionButton>
            </div>
          </ResultContainer>
        );
      })}

      <br />
      <p>
        Remark: It is highly recommended to have a meet up session between you and cat owners before
        accepting their requests. Directly accepting a request is meant for owners you have
        previously completed bookings with.
      </p>
    </>
  );
}

function Confirmed({ bookings }) {
  return (
    <>
      {bookings.map(({ name, cat }, index) => {
        return (
          <ResultContainer>
            <p>{index + 1}</p>
            <p>Owner: {name}</p>
            <p>Cat: {cat}</p>
            <hr />
          </ResultContainer>
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
          <ResultContainer>
            <p>{index + 1}</p>
            <p>Owner: {name}</p>
            <p>Cat: {cat}</p>
            <hr />
          </ResultContainer>
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
          <ResultContainer>
            <p>{index + 1}</p>
            <p>Owner: {name}</p>
            <p>Cat: {cat}</p>
            <hr />
          </ResultContainer>
        );
      })}
    </>
  );
}

import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'reactstrap';
import GoogleMap from '../../components/GoogleMap';
import Search from './Search';
import Result from './Result';
import styled from 'styled-components';
import { List } from 'antd';

let resultsFound = [];
for (let i = 0; i < 23; i++) {
  resultsFound.push({
    id: i,
    name: `Person ${i}`,
    image:
      'https://images.pexels.com/photos/569170/pexels-photo-569170.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    distance: '< 500 m',
    price: `${i + 1}0`,
    totalReviews: Math.floor(i * 2.3),
    totalCompletedBookings: Math.floor(i * 2.3),
    totalRepeatedCustomers: Math.floor(i * 2.3),
    description:
      'My name is Marieke. I have had a cat since I was 11 years old and I have been in love with cats ever since then...',
  });
}

const mapHeight = '80vh';

const allLocations = [
  { id: 1, name: 'Cat Owner #1', lat: 52.3449, lng: 4.8766 },
  { id: 2, name: 'Cat Owner #2', lat: 52.364, lng: 4.939 },
];

function FindCatSitter() {
  const { t, i18n } = useTranslation();
  const resultsRef = useRef(null);
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  const [selectedMarker, setSelectedMarker] = useState({ id: '' });

  return (
    <div style={{ padding: '0 40px' }}>
      <Search />
      <Row>
        <Col md={5}>
          <div
            style={{
              background: 'lightblue',
              //  width: '80vh',
              height: mapHeight,
              top: 20,
              bottom: 20,
              position: 'sticky',
            }}
          >
            {/* <GoogleMap
              mapHeight={mapHeight}
              defaultCenter={{ lat: 52.3667, lng: 4.8945 }}
              allLocations={allLocations}
              selectedMarker={selectedMarker}
              setSelectedMarker={setSelectedMarker}
            /> */}
          </div>
        </Col>
        <Col md={7}>
          <p ref={resultsRef} style={{ textAlign: 'left', marginBottom: 20 }}>
            Showing {resultsFound.length} cat sitters
          </p>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: () => scrollToRef(resultsRef),
              pageSize: 10,
            }}
            dataSource={resultsFound}
            renderItem={(item) => <Result item={item} />}
          />
        </Col>
      </Row>
    </div>
  );
}

export default FindCatSitter;

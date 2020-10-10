import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'reactstrap';
import GoogleMap from '../../components/GoogleMap';
import Search from './Search';
import Result from './Result';
import styled from 'styled-components';
import { List } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSitters } from '../../_actions/findCatSitterActions';

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

const defaultMapCenter = { lat: 52.3676, lng: 4.9041 }

function FindCatSitter() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { sitters } = useSelector((state) => state.account);

  const resultsRef = useRef(null);
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  const [mapZoom, setMapZoom] = useState(12);
  const [mapCenter, setMapCenter] = useState(defaultMapCenter)
  const [selectedMarker, setSelectedMarker] = useState({ id: '' });

  useEffect(() => {
    dispatch(getAllSitters());
  }, [dispatch]);

  useEffect(() => {
    console.log({ sitters });
  }, [sitters]);

  return (
    <div style={{ padding: '0 40px' }}>
      <Search setMapCenter={setMapCenter} />
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
              defaultCenter={defaultMapCenter}
              zoom={mapZoom}
              center={mapCenter}
              markers={allLocations}
              onMarkerClick={setSelectedMarker}
              selectedMarker={selectedMarker}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
              loadingElement={<div style={{ height: '100%' }} />}
              containerElement={<div style={{ width: '100%', height: mapHeight }} />}
              mapElement={<div style={{ height: '100%' }} />}
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

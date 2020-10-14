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

const mapHeight = '80vh';

const MapContainer = styled.div`
  background: lightblue;
  height: ${mapHeight};
  top: 20px;
  bottom: 20px;
  position: sticky;
`

// let resultsFound = [];
// for (let i = 0; i < 23; i++) {
//   resultsFound.push({
//     id: i,
//     name: `Person ${i}`,
//     image:
//       'https://images.pexels.com/photos/569170/pexels-photo-569170.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
//     distance: '< 500 m',
//     price: `${i + 1}0`,
//     totalReviews: Math.floor(i * 2.3),
//     totalCompletedBookings: Math.floor(i * 2.3),
//     totalRepeatedCustomers: Math.floor(i * 2.3),
//     description:
//       'My name is Marieke. I have had a cat since I was 11 years old and I have been in love with cats ever since then...',
//   });
// }

const resultsFound = [
  { id: 1, name: 'Cat Sitter #1', coordinates: { lat: 52.3640, lng: 4.9390 } },
  { id: 2, name: 'Cat Sitter #2', coordinates: { lat: 52.3599, lng: 4.7891 } },
  { id: 3, name: 'Cat Sitter #3', coordinates: { lat: 52.3310, lng: 4.8774 } },
  { id: 4, name: 'Cat Sitter #4', coordinates: { lat: 52.3757, lng: 4.9082 } },
  { id: 5, name: 'Cat Sitter #5', coordinates: { lat: 52.363708, lng: 4.882023 } },
  { id: 6, name: 'Cat Sitter #6', coordinates: { lat: 52.3843, lng: 4.9013 } },
];

const defaultMapCenter = { lat: 52.3676, lng: 4.9041 }
const radius = 500

function FindCatSitter() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { sitters } = useSelector((state) => state.account);

  const resultsRef = useRef(null);
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  const [zoom, setZoom] = useState(12);
  const [center, setCenter] = useState(defaultMapCenter)
  const [selectedMarker, setSelectedMarker] = useState({ id: '' });
  const [sitterRecords, setSitterRecords] = useState(resultsFound)

  const [sittersByAddress, setSittersByAddress] = useState([])

  const [hoveredMarkerId, setHoveredMarkerId] = useState('')

  useEffect(() => {
    dispatch(getAllSitters());
  }, [dispatch]);

  useEffect(() => {
    console.log({ hoveredMarkerId });
  }, [hoveredMarkerId]);

  return (
    <div style={{ padding: '0 40px' }}>
      <Search
        setZoom={setZoom}
        setCenter={setCenter}
        sitterRecords={sitterRecords}
        // setSitterRecords={setSitterRecords}
        setSittersByAddress={setSittersByAddress}
        radius={radius}
      />
      <Row>
        <Col md={5}>
          {/* <GoogleMap
            //defaultCenter={defaultMapCenter}
            zoom={zoom}
            center={center}
            radius={radius}
            markers={sitterRecords}
            hoveredMarkerId={hoveredMarkerId}
            onMarkerClick={setSelectedMarker}
            selectedMarker={selectedMarker}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<MapContainer />}
            mapElement={<div style={{ height: '100%' }} />}
          /> */}
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
            renderItem={(item) =>
              <Result
                item={item}
                setHoveredMarkerId={setHoveredMarkerId}
              />
            }
          />
        </Col>
      </Row>
    </div>
  );
}

export default FindCatSitter;

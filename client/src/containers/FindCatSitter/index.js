import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'reactstrap';
import { Map, MapDisplay } from '../../components/Google';
import GoogleMap from '../../components/Google/GoogleMap'
import Search from './Search';
import Result from './Result';
import styled from 'styled-components';
import { List } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSitters } from '../../redux/actions/findCatSitterActions';
// import { useLocation } from 'react-router-dom';
import { Spin } from 'antd';

const mapHeight = '80vh';

const MapContainer = styled.div`
  background: lightblue;
  height: ${mapHeight};
  top: 20px;
  bottom: 20px;
  position: sticky;
`

const MapLoadingDisplay = styled.div`
  display: flex;
  justify-content: center;
  background: rgba(255, 255, 255, 0.7); 
  position: absolute; 
  z-index: 5;
  width: 100%;
  height: 100%;
`

const LoadingSpin = styled(Spin)`
  align-self: center;
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

const places = [
  { id: 1, name: "Cat Sitter #1", lat: 52.364, lng: 4.939 },
  { id: 2, name: "Cat Sitter #2", lat: 52.3599, lng: 4.7891 },
  { id: 3, name: "Cat Sitter #3", lat: 52.331, lng: 4.8774 },
  { id: 4, name: "Cat Sitter #4", lat: 52.3757, lng: 4.9082 },
  { id: 5, name: "Cat Sitter #5", lat: 52.363708, lng: 4.882023 },
  { id: 6, name: "Cat Sitter #6", lat: 52.3843, lng: 4.9013 }
];

const defaultMapCenter = { lat: 52.3640, lng: 4.9390 }
const radius = 1000

function FindCatSitter() {
  // const { googlePlaceAddress, startDate, endDate } = useLocation().state || {};

  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const { sitters } = useSelector((state) => state.account);
  const { sitter_in_bounds } = useSelector((state) => state.find_cat_sitters);


  const resultsRef = useRef(null);
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  const [zoom, setZoom] = useState(12);
  const [center, setCenter] = useState(defaultMapCenter)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const [selectedMarker, setSelectedMarker] = useState({ id: '' });
  const [sittersByAddress, setSittersByAddress] = useState([])
  const [hoveredResultId, setHoveredResultId] = useState('')

  useEffect(() => {
    dispatch(getAllSitters());
    setResults(places)

  }, [dispatch]);

  useEffect(() => {
    if (sitter_in_bounds) {
      setTimeout(() => {
        setLoading(false)
        setResults(sitter_in_bounds)
      }, 800)
    }
  }, [sitter_in_bounds])

  return (
    <div style={{ padding: '0 40px' }}>
      <br />
      <br />
      {/* <Search
        setZoom={setZoom}
        setCenter={setCenter}
        results={results}
        // setResults={setResults}
        setSittersByAddress={setSittersByAddress}
        radius={radius}
      /> */}
      <Row>
        <Col md={5}>
          <MapContainer>
            <MapLoadingDisplay style={{ visibility: loading ? 'visible' : 'hidden' }}>
              <LoadingSpin size="large" />
            </MapLoadingDisplay>
            <GoogleMap
              zoom={zoom}
              setZoom={setZoom}
              center={center}
              setCenter={setCenter}
              results={results}
              setLoading={setLoading}
              hoveredResultId={hoveredResultId}
            />
          </MapContainer>
        </Col>

        <Col md={7}>
          <p ref={resultsRef} style={{ textAlign: 'left', marginBottom: 20 }}>
            Showing {results.length} cat sitters
          </p>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: () => scrollToRef(resultsRef),
              pageSize: 10,
            }}
            dataSource={results}
            renderItem={(item) =>
              <Result
                item={item}
                setHoveredResultId={setHoveredResultId}
              />
            }
          />
        </Col>
      </Row>
    </div>
  );
}

export default FindCatSitter;


{/* <MapDisplay
  center={center}
  zoom={zoom}
  results={results}
  setResults={setResults}
/> */}
{/* <Map
  //defaultCenter={defaultMapCenter}
  setResults={setResults}
  setBounds={setBounds}
  mapRef={mapRef}
  zoom={zoom}
  center={center}
  radius={radius}
  results={results}
  hoveredResultId={hoveredResultId}
  onMarkerClick={setSelectedMarker}
  selectedMarker={selectedMarker}
  //  googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
  //   loadingElement={<div style={{ height: '100%' }} />}
  containerElement={<MapContainer />}
  mapElement={<div style={{ height: '100%' }} />}
/> */}
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'reactstrap';
import { MapDisplay } from '../../components/Google';
import GoogleMap from '../../components/Google/GoogleMap'
import Search from './Search';
import Result from './Result';
import styled from 'styled-components';
import { List } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getSittersInBounds } from '../../redux/actions/findCatSitterActions';
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

const defaultMapCenter = { lat: 52.379189, lng: 4.899431 }

function FindCatSitter() {
  // const { googlePlaceAddress, startDate, endDate } = useLocation().state || {};

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { sitter_in_bounds } = useSelector((state) => state.find_cat_sitters);

  const resultsRef = useRef(null);
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  const [zoom, setZoom] = useState(12);
  const [center, setCenter] = useState(defaultMapCenter)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const [hoveredResultId, setHoveredResultId] = useState('')

  useEffect(() => {
    dispatch(getSittersInBounds());
  }, []);

  useEffect(() => {
    if (sitter_in_bounds) {
      setTimeout(() => {
        setLoading(false)
        setResults(sitter_in_bounds)
      }, 300)
    }
  }, [sitter_in_bounds])

  return (
    <div style={{ padding: '0 30px 50px 30px' }}>
      <br />
      <br />
      {/* <Search
        setZoom={setZoom}
        setCenter={setCenter}
      /> */}
      <Row>
        <Col md={7}>
          <p ref={resultsRef} style={{ textAlign: 'left', marginBottom: 20 }}>
            Showing 1-10 of {results.length} matches!
          </p>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (currentPage) => {
                scrollToRef(resultsRef)
                alert(currentPage)
              },
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
      </Row>
    </div>
  );
}

export default FindCatSitter;
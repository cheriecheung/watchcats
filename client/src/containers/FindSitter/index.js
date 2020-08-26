import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'reactstrap';
import GoogleMap from './GoogleMap';
import Search from './Search';
import ResultDisplay from './ResultDisplay';
import Profile from './Profile';
import styled from 'styled-components';

function FindSitter() {
  const { t, i18n } = useTranslation();
  const mapHeight = '80vh';

  return (
    <div style={{ padding: '0 40px' }}>
      {/* <Profile /> */}
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
            {/* <GoogleMap mapHeight={mapHeight} /> */}
          </div>
        </Col>
        <Col md={7}>
          <ResultDisplay />
        </Col>
      </Row>
    </div>
  );
}

export default FindSitter;

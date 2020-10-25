import React from 'react';
import { Map } from '../../../components/Google';
import styled from 'styled-components';

const mapHeight = '40vh';

const MapContainer = styled.div`
  background: lightblue;
  height: ${mapHeight};
  top: 20px;
  bottom: 20px;
  position: sticky;
`

const allLocations = [{ id: 1, name: 'Cat Sitter #1', coordinates: { lat: 52.3640, lng: 4.9390 } }];

function Location() {
  return (
    <>
      {/* <Map
        mapHeight="45vh"
        markers={allLocations}
        zoom={15}
        center={{ lat: 52.3449, lng: 4.8766 }}
        radius={500}
        defaultCenter={{ lat: 52.3449, lng: 4.8766 }}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<MapContainer />}
        mapElement={<div style={{ height: '100%' }} />}
      /> */}
    </>
  );
}

export default Location;

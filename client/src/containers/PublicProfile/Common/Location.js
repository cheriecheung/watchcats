import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Maps } from '../../../components/Google'

const mapHeight = '40vh';

const MapContainer = styled.div`
  background: lightblue;
  height: ${mapHeight};
  top: 20px;
  bottom: 20px;
`

function Location() {
  const [results, setResults] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setResults([
        {
          urlId: 'yRHl6YVB0',
          coordinates: [5.040622, 52.308051]
        }
      ])
    }, 1000)
  }, [])


  return (
    <MapContainer>
      <Maps
        zoom={12}
        // center={{ lat: results[0].coordinates[1], lng: results[0].coordinates[0] }}
        center={{ lat: 52.308051, lng: 5.040622 }}
        results={results}
      />
    </MapContainer>
  );
}

export default Location;

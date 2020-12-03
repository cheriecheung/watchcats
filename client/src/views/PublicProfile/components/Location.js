import React from 'react';
import { Maps } from '../../../components/Google'
import { MapContainer } from '../../../components/UIComponents'

function Location({ coordinates, urlId }) {
  const [lng, lat] = coordinates || []

  return (
    <MapContainer>
      <Maps
        zoom={12}
        center={{ lat, lng }}
        results={[{ urlId, coordinates }]}
      />
    </MapContainer>
  );
}

export default Location;

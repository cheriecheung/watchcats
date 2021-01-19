import React from 'react';
import { Maps } from '../../../components/Google'
import { LoadingMask, MapContainer, Spinner } from '../../../components/UIComponents'

function MapItem({
  loading,
  zoom,
  setZoom,
  center,
  results,
  hoveredResult,
  onGetSitters,
}) {
  return (
    <MapContainer variant="findCatSitter">
      <LoadingMask loading={loading}>
        <Spinner size="large" />
      </LoadingMask>
      <Maps
        zoom={zoom}
        setZoom={setZoom}
        center={center}
        results={results}
        hoveredResult={hoveredResult}
        onGetSitters={onGetSitters}
      />
    </MapContainer>
  )
}

export default MapItem
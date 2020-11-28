import React from 'react';
import { Maps } from '../../../components/Google'
import { LoadingMask, MapContainer, Spinner } from '../../../components/UIComponents'

function MapItem({
  loading,
  zoom,
  setZoom,
  center,
  results,
  hoveredResultId,
  onGetSitters
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
        hoveredResultId={hoveredResultId}
        onGetSitters={onGetSitters}
      />
    </MapContainer>
  )
}

export default MapItem
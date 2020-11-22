import React from 'react';
import { Maps } from '../../../components/Google'
import { LoadingMask, MapContainer, Spinner } from '../../../components/UIComponents'

function MapItem({
  loading,
  setLoading,
  zoom,
  setZoom,
  center,
  setBounds,
  returnToPageOne,
  results,
  hoveredResultId
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
        setBounds={setBounds}
        returnToPageOne={returnToPageOne}
        results={results}
        setLoading={setLoading}
        hoveredResultId={hoveredResultId}
      />
    </MapContainer>
  )
}

export default MapItem
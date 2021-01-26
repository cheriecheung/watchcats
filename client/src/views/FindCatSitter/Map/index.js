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
  onGetSitters,
  setBounds
}) {
  return (
    <MapContainer variant="findCatSitter">
      <LoadingMask onClick={() => !loading && onGetSitters()}>
        {loading ?
          <Spinner size="middle" colored={true} style={{ marginLeft: 0 }} />
          :
          <div style={{ alignSelf: 'center' }}>
            <i className="fas fa-search fa-xs" />
            <span style={{ fontWeight: 'bold', marginLeft: 5 }}>Search this area</span>
          </div>
        }
      </LoadingMask>
      <Maps
        zoom={zoom}
        setZoom={setZoom}
        center={center}
        results={results}
        hoveredResultId={hoveredResultId}
        onGetSitters={onGetSitters}
        setBounds={setBounds}
      />
    </MapContainer>
  )
}

export default MapItem
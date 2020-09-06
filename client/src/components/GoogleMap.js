import React, { useState } from 'react';
import { compose } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap as ReactGoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import location_marker from '../assets/images/location_marker.png';

const GoogleMap = ({
  mapHeight,
  defaultCenter,
  allLocations,
  selectedMarker,
  setSelectedMarker,
}) => {
  console.log({ allLocations });
  return (
    <MapWithMarkers
      defaultCenter={defaultCenter}
      markers={allLocations}
      selectedMarker={selectedMarker}
      onMarkerClick={(marker) => setSelectedMarker(marker)}
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={{ width: '100%', height: mapHeight }} />}
      mapElement={<div style={{ height: '100%' }} />}
    />
  );
};

export default GoogleMap;

const MapWithMarkers = compose(
  withScriptjs,
  withGoogleMap
)(({ onMarkerClick, selectedMarker, markers, defaultCenter }) => (
  <ReactGoogleMap defaultZoom={12} defaultCenter={defaultCenter}>
    {Array.isArray(markers) && markers.length > 0 ? (
      <AllMarkers markers={markers} onMarkerClick={onMarkerClick} selectedMarker={selectedMarker} />
    ) : (
      <Marker
        icon={{
          url: location_marker,
          scaledSize: {
            width: 28,
            height: 34,
            widthUnit: 'px',
            heightUnit: 'px',
          },
        }}
        position={{ lat: markers.lat, lng: markers.lng }}
      />
    )}
  </ReactGoogleMap>
));

const AllMarkers = ({ markers, onMarkerClick, selectedMarker }) => {
  return markers.map((marker) => {
    const { id, name, lat, lng } = marker;

    return (
      <Marker
        key={id}
        onClick={() => {
          onMarkerClick(marker);
        }}
        position={{ lat, lng }}
      >
        {selectedMarker.id === marker.id && (
          <InfoWindow style={{ padding: 0 }}>
            <div style={{ width: 200 }}>
              <img src="https://i.imgur.com/I86rTVl.jpg" alt={NamedNodeMap} width="100%" />
              <div style={{ textAlign: 'left', width: '100%' }}>
                <h5 style={{ color: '#a0dfcf', fontSize: '1.1rem' }}>{name}</h5>
                <p>Amsterdam keizergracht</p>
                <button
                  type="button"
                  style={{
                    marginTop: 10,
                    background: 'none',
                    border: '2px solid #a0dfcf',
                    color: '#fd980f',
                    borderRadius: 5,
                    width: '100%',
                    paddingTop: 3,
                    paddingBottom: 3,
                    outline: 'none',
                  }}
                >
                  <h6 style={{ margin: 0 }}>Check profile</h6>
                </button>
              </div>
            </div>
          </InfoWindow>
        )}
      </Marker>
    );
  });
};

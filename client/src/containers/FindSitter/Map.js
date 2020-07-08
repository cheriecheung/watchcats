import React, { useState } from "react";
import { compose } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

const Map = () => {
  const pets = [
    { id: 1, name: "Cat Owner #1", lat: 52.3449, lng: 4.8766 },
    { id: 2, name: "Cat Owner #2", lat: 52.364, lng: 4.939 },
  ];

  const [selectedMarker, setSelectedMarker] = useState({ id: "" });

  return (
    <MapWithMarkers
      selectedMarker={selectedMarker}
      markers={pets}
      onMarkerClick={(marker) => setSelectedMarker(marker)}
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
      loadingElement={<div style={{ height: "100%" }} />}
      containerElement={<div style={{ width: "100%", height: "100vh" }} />}
      mapElement={<div style={{ height: "100%" }} />}
    />
  );
};

export default Map;

const MapWithMarkers = compose(
  withScriptjs,
  withGoogleMap
)(({ onMarkerClick, selectedMarker, markers }) => (
  <GoogleMap defaultZoom={12} defaultCenter={{ lat: 52.3667, lng: 4.8945 }}>
    {markers.map((marker) => {
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
              <div>{name}</div>
            </InfoWindow>
          )}
        </Marker>
      );
    })}
  </GoogleMap>
));

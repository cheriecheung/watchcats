/* global google */

import React, { useState } from 'react';
import { compose } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  Circle
} from 'react-google-maps';
import location_marker from '../../assets/images/location_marker.png';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BrowseButton = styled(Link)`
  width: 100%;
  margin-top: 10px;
  padding: 3px 0;
  border: 2px solid #a0dfcf;
  border-radius: 5px;
  color: #fd980f;
  background: none;
  outline: none;
`

const Markers = ({ markers, onMarkerClick, selectedMarker, hoveredMarkerId, }) => {
  return markers.map((marker) => {
    console.log({ marker })
    const { id, name, coordinates } = marker;
    const { lat, lng } = coordinates;

    const iconWidth = hoveredMarkerId && hoveredMarkerId === id ? 35 : 28;
    const iconHeight = hoveredMarkerId && hoveredMarkerId === id ? 35 : 28;

    return (
      <>
        <Marker key={id} position={{ lat, lng }} />
        {/* <Marker
        key={id}
        onClick={() => {
          onMarkerClick(marker);
        }}
        position={{ lat, lng }}
        icon={{
          url: location_marker,
          scaledSize: {
            width: iconWidth,
            height: iconHeight,
            widthUnit: 'px',
            heightUnit: 'px',
          }
        }}
      >
        {selectedMarker &&
          selectedMarker.id === marker.id && (
            <InfoWindow style={{ padding: 0 }}>
              <div style={{ width: 200 }}>
                <img src="https://i.imgur.com/I86rTVl.jpg" alt={NamedNodeMap} width="100%" />

                <div style={{ textAlign: 'left', width: '100%' }}>
                  <h5 style={{ color: '#a0dfcf', fontSize: '1.1rem' }}>{name}</h5>
                  <p>Amsterdam keizergracht</p>
                  <BrowseButton to="/profile/catsitter/123">
                    <h6 style={{ margin: 0 }}>Check profile</h6>
                  </BrowseButton>
                </div>
              </div>
            </InfoWindow>
          )}
      </Marker> */}
      </>
    )
  })
}

const Map = compose(
  //withScriptjs,
  withGoogleMap
)(({ zoom, center, radius, markers, onMarkerClick, selectedMarker, hoveredMarkerId, mapRef, setBounds, setSitterRecords }) => {

  console.log({ markers })

  const setBoundsCoordinates = () => {
    const bounds = mapRef.getBounds()
    const neLat = bounds.getNorthEast().lat();
    const neLng = bounds.getNorthEast().lng();
    const swLat = bounds.getSouthWest().lat();
    const swLng = bounds.getSouthWest().lng();

    setBounds({
      northEast: { lat: neLat, lng: neLng },
      southWest: { lat: swLat, lng: swLng }
    })

    setSitterRecords([
      { id: 1, name: 'Cat Sitter #1', coordinates: { lat: 52.3080, lng: 4.9715 } },
    ])
  }

  return (
    <GoogleMap
      ref={(map) => mapRef ? mapRef = map : null}
      onIdle={() => setBounds ? setBoundsCoordinates() : null}
      onLoad={() => console.log('>>>>>>>>>>>>>>>>onload')}
      defaultZoom={zoom}
      defaultCenter={center}
      zoom={zoom}
      center={center}
      options={{
        //disableDefaultUI: true,
        zoomControl: true
      }}
    >

      {/* {zoom === 14 && (
        <Marker position={center}>
          <Circle
            center={center}
            radius={radius}
            options={{
              fillColor: '#A0A0A0',
              strokeColor: 'transparent',
            }}
          />
        </Marker>
      )} */}

      < Markers
        markers={markers}
        onMarkerClick={onMarkerClick}
        selectedMarker={selectedMarker}
        hoveredMarkerId={hoveredMarkerId}
      />
    </GoogleMap >
  )
});

export default Map;
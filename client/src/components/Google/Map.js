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

const Map = compose(
  //withScriptjs,
  withGoogleMap
)(({ zoom, center, radius, markers, onMarkerClick, selectedMarker, hoveredMarkerId, mapRef }) => {
  console.log({ zoom, center })

  return (
    <GoogleMap
      ref={(map) => mapRef = map}
      onIdle={(map) => console.log({ onIdle: mapRef.getBounds() })}
      defaultZoom={zoom}
      defaultCenter={center}
      zoom={zoom}
      center={center}
      options={{
        //disableDefaultUI: true,
        zoomControl: true
      }}
    >

      {zoom === 14 && (
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
      )}


      {Array.isArray(markers) &&
        markers.length > 0 &&
        markers.map((marker) => {
          const { id, name, coordinates } = marker;
          const { lat, lng } = coordinates;

          return (
            <Marker
              key={id}
              onClick={() => {
                onMarkerClick(marker);
              }}
              position={{ lat, lng }}
              icon={{
                url: location_marker,
                scaledSize: {
                  width: hoveredMarkerId && hoveredMarkerId === id ? 35 : 28,
                  height: hoveredMarkerId && hoveredMarkerId === id ? 40 : 34,
                  widthUnit: 'px',
                  heightUnit: 'px',
                },
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
            </Marker>)
        })}
      {/* {Array.isArray(markers) && markers.length > 0 ? (
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
      )} */}
    </GoogleMap>
  )
});

export default Map

// const AllMarkers = ({ markers, onMarkerClick, selectedMarker }) => {
//   return markers.map((marker) => {
//     const { id, name, lat, lng } = marker;

//     return (
//       <Marker
//         key={id}
//         onClick={() => {
//           onMarkerClick(marker);
//         }}
//         position={{ lat, lng }}
//       >
//         {selectedMarker.id === marker.id && (
//           <InfoWindow style={{ padding: 0 }}>
//             <div style={{ width: 200 }}>
//               <img src="https://i.imgur.com/I86rTVl.jpg" alt={NamedNodeMap} width="100%" />
//               <div style={{ textAlign: 'left', width: '100%' }}>
//                 <h5 style={{ color: '#a0dfcf', fontSize: '1.1rem' }}>{name}</h5>
//                 <p>Amsterdam keizergracht</p>
//                 <button
//                   type="button"
//                   style={{
//                     marginTop: 10,
//                     background: 'none',
//                     border: '2px solid #a0dfcf',
//                     color: '#fd980f',
//                     borderRadius: 5,
//                     width: '100%',
//                     paddingTop: 3,
//                     paddingBottom: 3,
//                     outline: 'none',
//                   }}
//                 >
//                   <h6 style={{ margin: 0 }}>Check profile</h6>
//                 </button>
//               </div>
//             </div>
//           </InfoWindow>
//         )}
//       </Marker>
//     );
//   });
// };

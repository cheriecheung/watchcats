import React, { useEffect } from "react";
import { render } from "react-dom";
import MainMap from "./MainMap";
import InfoWindow from "./InfoWindow";
import { useDispatch } from 'react-redux';
import { getSittersInBounds } from '../../../redux/actions/findCatSitterActions'

function GoogleMap({ zoom, center, setCenter, results, setLoading, hoveredMarkerId }) {
    const dispatch = useDispatch();
    let map;
    let infoWindow;
    // let markers = []

    const createInfoWindow = () => {
        infoWindow = new window.google.maps.InfoWindow({
            content: '<div id="infoWindow" />'
        });
    }

    const createMarkers = (map) => {
        console.log('creating markers>>>>')
        console.log({ results })

        results.map(({ lat, lng }) => {
            const markers = new window.google.maps.Marker({
                position: { lat, lng },
                map: map
            });

            markers.addListener("click", () => {
                infoWindow.addListener("domready", () => {
                    render(<InfoWindow />, document.getElementById("infoWindow"));
                });
                infoWindow.open(map, markers);
            });
        });
    }

    const getBoundsAfterEvent = (map) => {
        const bounds = map.getBounds();
        const neLat = bounds.getNorthEast().lat();
        const neLng = bounds.getNorthEast().lng();
        const swLat = bounds.getSouthWest().lat();
        const swLng = bounds.getSouthWest().lng();

        // dispatch(getSittersInBounds({ neLat, neLng, swLat, swLng }))
    }

    const setCenterAfterEvent = (map) => {
        const center = map.getCenter();
        const lat = center.lat();
        const lng = center.lng();

        setCenter({ lat, lng });
    }

    const addMapEventListeners = (map) => {
        new window.google.maps.event.addListener(map, 'dragend', () => {
            getBoundsAfterEvent(map);
            setCenterAfterEvent(map);
        });
        new window.google.maps.event.addListener(map, 'zoom_changed', () => {
            getBoundsAfterEvent(map);
            setCenterAfterEvent(map);
        });

        setLoading();
    }

    return (
        <MainMap
            id="myMap"
            options={{ center, zoom }}
            onMapLoad={(googleMap) => {
                map = googleMap
                createInfoWindow();
                createMarkers(map);
                addMapEventListeners(map)
            }}
            results={results}
        />
    );
}

export default GoogleMap;
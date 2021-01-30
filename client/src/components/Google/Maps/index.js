import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import PropTypes from 'prop-types';
import InfoWindow from "./InfoWindow";
import location_marker from '../../../assets/images/location_marker.png'

export default function Maps({
    zoom,
    setZoom,
    center,
    results,
    hoveredResultId,
    setBounds
}) {
    const [infoWindow, setInfoWindow] = useState();
    const [map, setMap] = useState(null)
    const [markersArray, setMarkersArray] = useState([]);

    useEffect(() => {
        hoveredResultId && markersArray.forEach((marker) => {
            if (marker.id === hoveredResultId) {
                marker.setAnimation(window.google.maps.Animation.BOUNCE);
            } else {
                marker.setAnimation(null);
            }
        })
    }, [hoveredResultId])

    const createInfoWindow = () => {
        const infoWindowInstance = new window.google.maps.InfoWindow({
            content: '<div id="infoWindow" />'
        });
        setInfoWindow(infoWindowInstance)
    }

    const createMarkers = () => {
        if (markersArray.length > 0) {
            markersArray.forEach((marker) => marker.setMap(null))
        }

        const allMarkers = results.map((item) => {
            const { urlId, coordinates = [] } = item
            const lng = coordinates[0]
            const lat = coordinates[1]

            const marker = new window.google.maps.Marker({
                id: urlId,
                position: { lat, lng },
                map: map
            });

            marker.setIcon({
                url: location_marker,
                scaledSize: new window.google.maps.Size(30, 40)
            });

            setZoom && marker.addListener("click", () => {
                infoWindow.addListener("domready", () => {
                    render(
                        <InfoWindow item={item} />,
                        document.getElementById("infoWindow")
                    );
                });
                infoWindow.open(map, marker);
            });

            marker.setMap(map);

            return marker
        });

        setMarkersArray(allMarkers)
    }

    const getBoundsAfterEvent = () => {
        const bounds = map.getBounds();
        const neLat = bounds.getNorthEast().lat();
        const neLng = bounds.getNorthEast().lng();
        const swLat = bounds.getSouthWest().lat();
        const swLng = bounds.getSouthWest().lng();

        setBounds({ neLat, neLng, swLat, swLng });
    }

    const addMapEventListeners = () => {
        new window.google.maps.event.addListener(map, 'idle', () => {
            getBoundsAfterEvent(map);
            const zoom = map.getZoom();
            setZoom && setZoom(zoom)
        });
    }

    useEffect(() => {
        if (map && results) {
            createMarkers();
        }
    }, [map, results])

    useEffect(() => {
        if (map && zoom) {
            map.setZoom(zoom);
        }
    }, [map, zoom])


    useEffect(() => {
        if (map && center) {
            map.setCenter(center)
        }
    }, [map, center])

    useEffect(() => {
        if (map && setZoom) {
            createInfoWindow();
            addMapEventListeners();
        }
    }, [map])

    useEffect(() => {
        const map = new window.google.maps.Map(
            document.getElementById("find_cat_sitter_map"),
            {
                center,
                zoom,
                disableDefaultUI: true,
                zoomControl: true
            }
        );

        setMap(map);
    }, []);

    return <div style={{ width: '100%', height: '100%' }} id="find_cat_sitter_map" />
}

Maps.propTypes = {
    zoom: PropTypes.number.isRequired,
    setZoom: PropTypes.func,
    center: PropTypes.object.isRequired,
    results: PropTypes.array.isRequired,
    hoveredResultId: PropTypes.string,
    onGetSitters: PropTypes.func,
};

Maps.defaultProps = {
    setZoom: undefined,
    hoveredResultId: '',
    onGetSitters: undefined
};


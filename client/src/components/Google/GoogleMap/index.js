import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import MainMap from "./MainMap";
import InfoWindow from "./InfoWindow";
import { useDispatch } from 'react-redux';
import { getSittersInBounds } from '../../../redux/actions/findCatSitterActions'
import location_marker from '../../../assets/images/location_marker.png'

function GoogleMap({
    zoom,
    setZoom,
    center,
    setCenter,
    results,
    setLoading,
    hoveredResultId
}) {
    const dispatch = useDispatch();

    const [infoWindow, setInfoWindow] = useState();
    const [map, setMap] = useState(null)
    const [markersArray, setMarkersArray] = useState([]);

    useEffect(() => {
        markersArray.forEach((marker) => {
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
            console.log({ item })
            const { urlId, coordinates } = item
            const lng = coordinates[0]
            const lat = coordinates[1]

            const marker = new window.google.maps.Marker({
                id: urlId,
                position: { lat, lng },
                map: map
            });

            marker.setIcon({
                url: location_marker,
                scaledSize: new window.google.maps.Size(35, 48)
            });

            marker.addListener("click", () => {
                infoWindow.addListener("domready", () => {
                    render(<InfoWindow />, document.getElementById("infoWindow"));
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

        console.log({ neLat, neLng, swLat, swLng })

        setLoading(true);
        dispatch(getSittersInBounds({ neLat, neLng, swLat, swLng }))
    }

    // const setCenterAfterEvent = () => {
    //     const center = map.getCenter();
    //     const lat = center.lat();
    //     const lng = center.lng();
    //     setCenter({ lat, lng });

    //     const zoom = map.getZoom();
    //     setZoom(zoom)
    // }

    const addMapEventListeners = () => {
        // new window.google.maps.event.addListener(map, 'dragend', () => {
        //     getBoundsAfterEvent(map);
        //     setCenterAfterEvent(map);
        // });
        // new window.google.maps.event.addListener(map, 'zoom_changed', () => {
        //     getBoundsAfterEvent(map);
        //     setCenterAfterEvent(map);
        // });
        new window.google.maps.event.addListener(map, 'idle', () => {
            getBoundsAfterEvent(map);
            const zoom = map.getZoom();
            setZoom(zoom)
        });
    }

    useEffect(() => {
        if (results) {
            createMarkers();
        }
    }, [results])

    useEffect(() => {
        console.log({ zoom })

        if (map && zoom) {
            console.log({ zoomWithMap: zoom })
            map.setZoom(zoom);
        }
    }, [map, zoom])


    useEffect(() => {
        if (map && center) {
            map.setCenter(center)

        }
    }, [map, center])

    useEffect(() => {
        if (map) {
            createInfoWindow();
            addMapEventListeners();
        }
    }, [map])

    return (
        <>
            <MainMap
                id="myMap"
                options={{ center, zoom }}
                results={results}
                setMap={data => setMap(data)}
            />

            {/* <MainMap
            id="myMap"
            options={{ center, zoom }}
            onMapLoad={(map) => {
                createInfoWindow();
                createMarkers(map);
                addMapEventListeners(map)
            }}
            results={results}
            setMap={data => setMap(data)}
        /> */}
        </>
    );
}

export default GoogleMap;
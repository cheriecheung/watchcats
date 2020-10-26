import React, { useEffect, useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { getErrorProperties } from '../../utility'
import { useTranslation } from 'react-i18next';

const ErrorDisplay = styled.span`
  color: #E56E5A;
  float: right;
`

function PlaceAutocomplete({
    name,
    setZoom,
    setCenter,
    emptyOtherFilters,
    results,
    setSittersByAddress,
    radius
}) {
    const { t } = useTranslation();
    const autoCompleteRef = useRef(null);

    const { control, errors, reset } = useFormContext();
    const { hasError, message } = getErrorProperties(name, errors)

    let autoComplete;
    const { google } = window;
    // const google = (window.google = window.google ? window.google : {});

    const handlePlaceSelect = async () => {
        emptyOtherFilters && emptyOtherFilters();

        const addressObject = autoComplete.getPlace();
        const newAddress = addressObject.formatted_address;
        //udpateAddress(newAddress);
        reset({ [name]: newAddress })

        const addressLat = addressObject.geometry.location.lat();
        const addressLng = addressObject.geometry.location.lng();

        if (results && setSittersByAddress && radius) {
            const filtered = results.filter(
                ({ coordinates }) => {
                    const { lat, lng } = coordinates;

                    const distance =
                        google.maps.geometry.spherical.computeDistanceBetween(
                            // filled-in address in auto-complete
                            new google.maps.LatLng(addressLat, addressLng),
                            // existing car park
                            new google.maps.LatLng(parseFloat(lat), parseFloat(lng))
                        ) <= radius;

                    return distance === true;
                }
            );

            setSittersByAddress(filtered)
        }

        console.log({ addressLat, addressLng })

        setZoom && setZoom(14)
        setCenter && setCenter({ lat: addressLat, lng: addressLng });
    };

    const handleScriptLoad = (ref) => {
        autoComplete = new window.google.maps.places.Autocomplete(ref.current, {
            componentRestrictions: { country: 'nl' },
        });
        autoComplete.setFields(['address_components', 'formatted_address', 'geometry']);
        autoComplete.addListener('place_changed', () => handlePlaceSelect());
    };

    useEffect(() => {
        handleScriptLoad(autoCompleteRef);
    }, []);

    return (
        <>
            <Controller
                control={control}
                name={name}
                as={
                    <input
                        ref={autoCompleteRef}
                        type="text"
                        placeholder={t('find_sitter.address')}
                        className="form-control"
                        style={{ outline: 'none', paddingLeft: 10 }}
                    />
                } />
            <ErrorDisplay hidden={!hasError}>{message}</ErrorDisplay>
        </>
    )
}

export default PlaceAutocomplete
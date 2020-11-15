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
}) {
    const { t } = useTranslation();
    const autoCompleteRef = useRef(null);

    const { control, errors, reset, watch } = useFormContext();
    const { hasError, message } = getErrorProperties(name, errors)

    let autoComplete;

    const handlePlaceSelect = async () => {
        emptyOtherFilters && emptyOtherFilters();

        const addressObject = autoComplete.getPlace();
        const newAddress = addressObject.formatted_address;
        reset({ [name]: newAddress })

        const addressLat = addressObject.geometry.location.lat();
        const addressLng = addressObject.geometry.location.lng();

        setZoom && setZoom(14)
        setCenter && setCenter({ lat: addressLat, lng: addressLng });

        console.log({ addressLat, addressLng })
    };

    const handleScriptLoad = (ref) => {
        autoComplete = new window.google.maps.places.Autocomplete(ref.current, {
            // add bounds (limits of amsterdam)
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
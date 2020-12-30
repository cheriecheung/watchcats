import React, { useRef } from 'react'
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getErrorProperties } from '../../utility'
import { ErrorDisplay } from '../FormComponents'

export default function PlaceAutocomplete({
    name,
    setLoading,
    setZoom,
    setCenter,
    emptyOtherFilters,
    style
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

        setLoading && setLoading(true)
        setZoom && setZoom(13)
        setCenter && setCenter({ lat: addressLat, lng: addressLng });

        console.log({ addressLat, addressLng })
    };

    const handleScriptLoad = (ref) => {
        const input = ref.current;
        const options = {
            bounds: new window.google.maps.LatLngBounds(
                new window.google.maps.LatLng(52.3105, 4.7683),
                new window.google.maps.LatLng(52.4321, 5.0337)
            ),
            strictBounds: true
        }

        autoComplete = new window.google.maps.places.Autocomplete(input, options);
        autoComplete.setFields(['address_components', 'formatted_address', 'geometry']);
        autoComplete.addListener('place_changed', () => handlePlaceSelect());
    };

    // useEffect(() => {
    //     handleScriptLoad(autoCompleteRef);
    // }, []);

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
                        style={{ outline: 'none', paddingLeft: 10, ...style }}
                    />
                } />
            <ErrorDisplay hidden={!hasError}>{message}</ErrorDisplay>
        </>
    )
}

PlaceAutocomplete.propTypes = {
    name: PropTypes.string.isRequired,
    setLoading: PropTypes.func,
    setZoom: PropTypes.func.isRequired,
    setCenter: PropTypes.func.isRequired,
    emptyOtherFilters: PropTypes.func,
    style: PropTypes.object
};

PlaceAutocomplete.defaultProps = {
    setLoading: () => { return null; },
    emptyOtherFilters: () => { return null; },
    style: {}
}
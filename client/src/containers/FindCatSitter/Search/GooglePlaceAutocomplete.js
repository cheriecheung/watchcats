import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

function GooglePlaceAutocomplete({ setZoom, setCenter, address, setAddress, sitterRecords, setSittersByAddress, emptyOtherFilters, radius }) {
  const { t } = useTranslation();

  let autoComplete;
  const { google } = window;
  // const google = (window.google = window.google ? window.google : {});

  const autoCompleteRef = useRef(null);

  const handlePlaceSelect = async (udpateAddress) => {
    emptyOtherFilters();

    const addressObject = autoComplete.getPlace();
    const newAddress = addressObject.formatted_address;
    udpateAddress(newAddress);

    const addressLat = addressObject.geometry.location.lat();
    const addressLng = addressObject.geometry.location.lng();

    const filtered = sitterRecords.filter(
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

    console.log({ addressLat, addressLng })

    setZoom(14)
    setCenter({ lat: addressLat, lng: addressLng });
    setSittersByAddress(filtered)
  };

  const handleScriptLoad = (updateAddress, ref) => {
    autoComplete = new window.google.maps.places.Autocomplete(ref.current, {
      componentRestrictions: { country: 'nl' },
    });
    autoComplete.setFields(['address_components', 'formatted_address', 'geometry']);
    autoComplete.addListener('place_changed', () => handlePlaceSelect(updateAddress));
  };

  useEffect(() => {
    handleScriptLoad(setAddress, autoCompleteRef);
  }, []);

  return (
    <input
      ref={autoCompleteRef}
      onChange={(e) => setAddress(e.target.value)}
      value={address}
      type="text"
      placeholder={t('find_sitter.address')}
      className="form-control"
      style={{ outline: 'none', paddingLeft: 10 }}
    />
  );
}

export default GooglePlaceAutocomplete;

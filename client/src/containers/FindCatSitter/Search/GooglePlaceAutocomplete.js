import React, { useState, useEffect, useRef } from 'react';

function GooglePlaceAutocomplete({ setMapCenter, address, setAddress, emptyOtherFilters, t }) {
  let autoComplete;
  // const { google } = window;
  // const google = (window.google = window.google ? window.google : {});

  const autoCompleteRef = useRef(null);

  const handlePlaceSelect = async (udpateAddress) => {
    emptyOtherFilters();

    const addressObject = autoComplete.getPlace();
    const newAddress = addressObject.formatted_address;
    udpateAddress(newAddress);

    const lat = addressObject.geometry.location.lat();
    const lng = addressObject.geometry.location.lng();

    console.log({ lat, lng })

    setMapCenter({ lat, lng });
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

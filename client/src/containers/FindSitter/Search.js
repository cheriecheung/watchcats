import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import { themeColor } from '../../style/theme';

function Search({ setCenter, reset, setReset }) {
  const { t, i18n } = useTranslation();
  const [openStartDate, setOpenStartDate] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [openEndDate, setOpenEndDate] = useState(false);
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (openStartDate) {
      setOpenEndDate(false);
    }
  }, [openStartDate]);

  useEffect(() => {
    if (openEndDate) {
      setOpenStartDate(false);
    }
  }, [openEndDate]);

  const pickerFooter = (type) => {
    return (
      <button
        style={{
          background: 'transparent',
          border: 'none',
          float: 'left',
          position: 'absolute',
        }}
        onClick={() => {
          if (type === 'startDate') {
            setStartDate('');
            setOpenStartDate(false);
          } else {
            setEndDate('');
            setOpenEndDate(false);
          }
        }}
      >
        CLEAR
      </button>
    );
  };

  return (
    <div
      style={{
        height: 100,
        background: '#F8F8F8',
        borderBottom: `1px solid ${themeColor.peach}`,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <GooglePlaceAutoComplete
        setCenter={setCenter}
        reset={reset}
        setReset={setReset}
      />
      <div
        style={{
          marginTop: -10,
          width: 130,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <button
            style={{
              background: '#a0dfcf',
              border: 'none',
              padding: 10,
              position: 'absolute',
              outline: 'none',
              width: 100,
            }}
            onClick={() => setOpenStartDate(!openStartDate)}
          >
            {startDate !== '' ? startDate : 'Start date'}
          </button>
          <DatePicker
            style={{ width: 0, zIndex: -1 }}
            open={openStartDate}
            renderExtraFooter={() => pickerFooter('startDate')}
            format="DD-MM-YY"
            onChange={(date, dateString) => {
              setStartDate(dateString);
              setOpenStartDate(false);
            }}
          />
        </div>

        <div>
          <button
            style={{
              background: '#a0dfcf',
              border: 'none',
              padding: 10,
              position: 'absolute',
              outline: 'none',
              width: 100,
            }}
            onClick={() => setOpenEndDate(!openEndDate)}
          >
            {endDate !== '' ? endDate : 'End date'}
          </button>
          <DatePicker
            style={{ width: 0, zIndex: -1 }}
            open={openEndDate}
            renderExtraFooter={() => pickerFooter('endDate')}
            format="DD-MM-YY"
            onChange={(date, dateString) => {
              setEndDate(dateString);
              setOpenEndDate(false);
            }}
          />
        </div>
      </div>

      <button
        style={{
          background: '#a0dfcf',
          border: 'none',
          padding: 10,
          outline: 'none',
        }}
      >
        About my cat(s)
      </button>

      <button
        style={{
          background: '#a0dfcf',
          border: 'none',
          padding: 10,
          outline: 'none',
        }}
      >
        Requirement
      </button>
    </div>
  );
}

export default Search;

const GooglePlaceAutoComplete = ({ setCenter, reset, setReset }) => {
  let autoComplete;
  // const { google } = window;
  // const google = (window.google = window.google ? window.google : {});

  const [address, setAddress] = useState('');
  const autoCompleteRef = useRef(null);

  const handlePlaceSelect = async (udpateAddress) => {
    const addressObject = autoComplete.getPlace();
    const newAddress = addressObject.formatted_address;
    udpateAddress(newAddress);

    const lat = addressObject.geometry.location.lat();
    const lng = addressObject.geometry.location.lng();

    setCenter({ lat, lng });
    setReset(true);
  };

  const handleScriptLoad = (updateAddress, ref) => {
    autoComplete = new window.google.maps.places.Autocomplete(ref.current, {
      componentRestrictions: { country: 'nl' },
    });
    autoComplete.setFields([
      'address_components',
      'formatted_address',
      'geometry',
    ]);
    autoComplete.addListener('place_changed', () =>
      handlePlaceSelect(updateAddress)
    );
  };

  useEffect(() => {
    handleScriptLoad(setAddress, autoCompleteRef);
  }, []);

  useEffect(() => {
    if (reset === false) {
      setAddress('');
    }
  }, [reset]);

  return (
    <input
      ref={autoCompleteRef}
      onChange={(e) => setAddress(e.target.value)}
      value={address}
      type="text"
      placeholder="Where would you like to search?"
      className="find-sitter-by-address"
      style={{ outline: 'none', padding: '5px 10px', width: 200 }}
    />
  );
};

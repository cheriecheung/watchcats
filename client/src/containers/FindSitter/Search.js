import React, { useState, useEffect, useRef } from 'react';
import { Row, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import {
  DatePicker,
  FieldLabel,
  RadioGroup,
  RadioButton,
} from '../../components/FormComponents';
import { useForm, FormProvider } from 'react-hook-form';
import 'antd/dist/antd.css';
import { themeColor } from '../../style/theme';
import styled from 'styled-components';

const SearchContainer = styled.div`
  text-align: left;
  margin-bottom: 25px;
  border-radius: 10px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.05), 0 1px 6px rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  display: flex;
`;

function Search({ setCenter }) {
  const { t, i18n } = useTranslation();
  const methods = useForm();
  const { register, control, handleSubmit, reset, watch } = methods;

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

  const sendData = (data) => {
    console.log(data);
  };

  return (
    <div style={{ paddingTop: 25 }}>
      <SearchContainer>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(sendData)}
            style={{
              minHeight: 80,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Row style={{ width: '100%', margin: '0 5px' }}>
              <Col md={3}>
                <GooglePlaceAutoComplete setCenter={setCenter} />
              </Col>
              <Col md={4}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-around' }}
                >
                  <div
                    className="d-flex flex-column date-picker"
                    style={{ flexBasis: '45%' }}
                  >
                    <DatePicker name="startDate" placeholder="Start date" />
                  </div>
                  <i className="fas fa-arrow-right align-self-center" />
                  <div
                    className="d-flex flex-column date-picker"
                    style={{ flexBasis: '45%' }}
                  >
                    <DatePicker name="endDate" placeholder="End date" />
                  </div>
                </div>
              </Col>
              <Col md={4} className="icon-group-sort">
                <RadioGroup name="sortBy">
                  <RadioButton value="reviews" style={{ marginRight: 5 }}>
                    <i className="fas fa-star icon-sort-price" />
                    <span>Review</span>
                  </RadioButton>
                  <RadioButton value="Distance" style={{ marginRight: 5 }}>
                    <i className="fas fa-map-marker-alt icon-sort-price" />
                    <span>Distance</span>
                  </RadioButton>
                  <RadioButton value="price">
                    <i className="fas fa-euro-sign icon-sort-price" />
                    <span>Price</span>
                  </RadioButton>
                </RadioGroup>
              </Col>
              <Col md={1} style={{ alignSelf: 'center' }}>
                <button
                  style={{
                    background: 'none',
                    outline: 'none',
                    border: 'none',
                  }}
                >
                  Reset
                </button>
              </Col>
            </Row>
          </form>
        </FormProvider>
      </SearchContainer>
    </div>
  );
}

export default Search;

const GooglePlaceAutoComplete = ({ setCenter }) => {
  let autoComplete;
  // const { google } = window;
  // const google = (window.google = window.google ? window.google : {});

  const [address, setAddress] = useState('');
  const autoCompleteRef = useRef(null);

  // const handlePlaceSelect = async (udpateAddress) => {
  //   const addressObject = autoComplete.getPlace();
  //   const newAddress = addressObject.formatted_address;
  //   udpateAddress(newAddress);

  //   const lat = addressObject.geometry.location.lat();
  //   const lng = addressObject.geometry.location.lng();

  //   setCenter({ lat, lng });
  // };

  // const handleScriptLoad = (updateAddress, ref) => {
  //   autoComplete = new window.google.maps.places.Autocomplete(ref.current, {
  //     componentRestrictions: { country: 'nl' },
  //   });
  //   autoComplete.setFields([
  //     'address_components',
  //     'formatted_address',
  //     'geometry',
  //   ]);
  //   autoComplete.addListener('place_changed', () =>
  //     handlePlaceSelect(updateAddress)
  //   );
  // };

  // useEffect(() => {
  //   handleScriptLoad(setAddress, autoCompleteRef);
  // }, []);

  // useEffect(() => {
  //   if (reset === false) {
  //     setAddress('');
  //   }
  // }, [reset]);

  return (
    <input
      ref={autoCompleteRef}
      onChange={(e) => setAddress(e.target.value)}
      value={address}
      type="text"
      placeholder="Address"
      className="form-control"
      style={{ outline: 'none', paddingLeft: 10 }}
    />
  );
};

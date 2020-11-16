import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { useForm, FormProvider } from 'react-hook-form';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { filterByDate, sortSitters } from '../../../redux/actions/findCatSitterActions';
import { sortingTypeOptions } from '../../../constants';

import { PlaceAutocomplete } from '../../../components/Google'
import AppointmentPeriodPicker from './AppointmentPeriodPicker';
import Sorting from './Sorting';

const SearchContainer = styled.div`
  text-align: left;
  margin-bottom: 25px;
  border-radius: 10px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.05), 0 1px 6px rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 1);

  display: flex;
  padding: 2px 0;
`;

const SearchForm = styled.form`
  width: 100%;
  min-height: 100px;
  align-items: center;
  padding: 15px 15px;
`

const FieldContainer = styled.div`
  flex: ${props => props.flex};
  padding: 0 15px;
  align-self: center;

  @media (max-width: 770px) {
    flex: 100%;
    margin-bottom: 20px;
    padding: 0;
  }
`

const ResetButton = styled.div`
  background: none;
  outline: none;
  border: none;
  align-self: center;
`

const defaultValues = {
  googlePlaceAddress: '',
  startDate: '',
  endDate: '',
  sortBy: sortingTypeOptions[0],
};

function Search({ setLoading, setZoom, setCenter }) {
  const { googlePlaceAddress, startDate, endDate } = useLocation().state || {};

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const methods = useForm({ defaultValues });
  const { register, control, handleSubmit, reset, watch, setValue } = methods;
  const startDateValue = watch('startDate');
  const endDateValue = watch('endDate');
  const sortByValue = watch('sortBy');

  const fetchSitters = () => {
    console.log('fetch sitters here');
  };

  // const { google } = window;

  useEffect(() => {
    if (googlePlaceAddress && startDate && endDate) {
      reset({ googlePlaceAddress })
      // google.maps.event.trigger(autocomplete, 'place_changed');
    }
    console.log({ googlePlaceAddress, startDate, endDate })
  }, [googlePlaceAddress, startDate, endDate])


  useEffect(() => {
    if ((startDateValue !== '', endDateValue !== '')) {
      dispatch(filterByDate());
    }
  }, [startDateValue, endDateValue]);

  useEffect(() => {
    const { value } = sortByValue || {};

    if (value !== '') {
      // setValue('startDate', '');
      // setValue('endDate', '');
      // setAddress('');

      dispatch(sortSitters(value));
    }
  }, [sortByValue]);

  useEffect(() => {
    if (startDateValue !== '' || endDateValue !== '') {
      // setValue('sortBy', '');
      // setAddress('');
    }

    // use yup
    if (startDateValue !== '' && endDateValue !== '') {
      if (new Date(startDateValue) > new Date(endDateValue)) {
        console.log('hey make sure your end date is after or equal to start date');
      } else {
        fetchSitters();
      }
    }
  }, [startDateValue, endDateValue]);

  const sendData = (data) => {
    console.log(data);
  };

  return (
    <SearchContainer>
      <FormProvider {...methods}>
        <SearchForm onSubmit={handleSubmit(sendData)}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap'
          }}>
            <FieldContainer flex="10%">
              <PlaceAutocomplete
                name="googlePlaceAddress"
                setLoading={setLoading}
                setZoom={setZoom}
                setCenter={setCenter}
                emptyOtherFilters={() => reset(defaultValues)}
              />
            </FieldContainer>

            <FieldContainer flex="30%">
              <AppointmentPeriodPicker />
            </FieldContainer>

            <FieldContainer flex="10%">
              <Sorting />
            </FieldContainer>

            <FieldContainer>
              <ResetButton
                type="button"
                onClick={() => {
                  reset(defaultValues);
                  setZoom(12)
                }}
              >
                {t('find_sitter.reset')}
              </ResetButton>
            </FieldContainer>
          </div>
        </SearchForm>
      </FormProvider>
    </SearchContainer>
  );
}

export default Search;

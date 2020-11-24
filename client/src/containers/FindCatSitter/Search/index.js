import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useForm, FormProvider } from 'react-hook-form';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { filterByDate, sortSitters } from '../../../redux/actions/findCatSitterActions';
import { sortingTypeOptions } from '../../../constants';

import { PlaceAutocomplete } from '../../../components/Google'
import { HorizontalCard, TextButton } from '../../../components/UIComponents'
import AppointmentPeriodPicker from './AppointmentPeriodPicker';
import Sorting from './Sorting';

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

const defaultValues = {
  googlePlaceAddress: '',
  startDate: '',
  endDate: '',
  sortBy: sortingTypeOptions[0],
};

function Search({ t, setLoading, setZoom, setCenter }) {
  const { googlePlaceAddress, startDate, endDate } = useLocation().state || {};
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
    <HorizontalCard>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(sendData)}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap'
          }}>
            <FieldContainer flex="10%">
              {/* <PlaceAutocomplete
                name="googlePlaceAddress"
                setLoading={setLoading}
                setZoom={setZoom}
                setCenter={setCenter}
                emptyOtherFilters={() => reset(defaultValues)}
              /> */}
            </FieldContainer>

            <FieldContainer flex="30%">
              <AppointmentPeriodPicker t={t} />
            </FieldContainer>

            <FieldContainer flex="10%">
              <Sorting t={t} />
            </FieldContainer>

            <FieldContainer>
              <TextButton
                type="button"
                onClick={() => {
                  reset(defaultValues);
                  setZoom(12)
                }}
              >
                {t('find_sitter.reset')}
              </TextButton>
            </FieldContainer>
          </div>
        </form>
      </FormProvider>
    </HorizontalCard>
  );
}

export default Search;

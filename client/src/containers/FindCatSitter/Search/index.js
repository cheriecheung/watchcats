import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';

import { useForm, FormProvider } from 'react-hook-form';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { filterByDate, sortSitters } from '../../../_actions/findCatSitterActions';
import { sortingTypeOptions } from '../../../constants';

import GooglePlaceAutocomplete from './GooglePlaceAutocomplete';
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

const ResetButton = styled.div`
background: 'none',
outline: 'none',
border: 'none',
`

const defaultValues = {
  startDate: '',
  endDate: '',
  sortBy: sortingTypeOptions[0],
};

function Search({ setZoom, setCenter, sitterRecords, setSittersByAddress, radius }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const methods = useForm({ defaultValues });
  const { register, control, handleSubmit, reset, watch, setValue } = methods;
  const startDateValue = watch('startDate');
  const endDateValue = watch('endDate');
  const sortByValue = watch('sortBy');

  const [address, setAddress] = useState('');

  const fetchSitters = () => {
    console.log('fetch sitters here');
  };


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
      setAddress('');

      dispatch(sortSitters(value));
    }
  }, [sortByValue]);

  useEffect(() => {
    if (startDateValue !== '' || endDateValue !== '') {
      // setValue('sortBy', '');
      setAddress('');
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
                <GooglePlaceAutocomplete
                  setZoom={setZoom}
                  setCenter={setCenter}
                  address={address}
                  setAddress={setAddress}
                  sitterRecords={sitterRecords}
                  setSittersByAddress={setSittersByAddress}
                  emptyOtherFilters={() => reset(defaultValues)}
                  radius={radius}
                />
              </Col>

              <Col md={4}>
                <AppointmentPeriodPicker />
              </Col>

              <Col md={4} className="icon-group-sort">
                <Sorting />
              </Col>

              <Col md={1} style={{ alignSelf: 'center' }}>
                <ResetButton
                  type="button"
                  onClick={() => {
                    reset(defaultValues);
                    setZoom(12)
                    setAddress('');
                  }}
                >
                  {t('find_sitter.reset')}
                </ResetButton>
              </Col>
            </Row>
          </form>
        </FormProvider>
      </SearchContainer>
    </div>
  );
}

export default Search;

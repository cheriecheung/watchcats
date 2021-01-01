import React from 'react';
import 'antd/dist/antd.css';
import { PlaceAutocomplete } from '../../../components/Google'
import { HorizontalCard, TextButton } from '../../../components/UIComponents'
import AppointmentPeriod from './AppointmentPeriod';
import Sorting from './Sorting';
import { FieldContainer } from '../styledComponents'

function Search({ t, searchProps }) {
  const {
    FormProvider,
    methods,
    resetSearch,
    defaultValues,
    setLoading,
    setZoom,
    setCenter
  } = searchProps;
  const { reset } = methods;

  return (
    <HorizontalCard style={{ width: 'unset' }}>
      <FormProvider {...methods}>
        <form>
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
              <AppointmentPeriod />
            </FieldContainer>

            <FieldContainer flex="10%">
              <Sorting />
            </FieldContainer>

            <FieldContainer>
              <TextButton
                type="button"
                onClick={resetSearch}
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
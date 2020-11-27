import React from 'react';
import 'antd/dist/antd.css';
import styled from 'styled-components';

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

function Search({ t, searchProps }) {
  const { FormProvider, methods, resetSearch } = searchProps;

  return (
    <HorizontalCard variant="findCatSitter">
      <FormProvider {...methods}>
        {/* <form onSubmit={handleSubmit(sendData)}> */}
        <form>
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
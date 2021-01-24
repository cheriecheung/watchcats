import React from 'react';
import { PlaceAutocomplete } from '../../../components/Google';
import { HorizontalCard, TextButton } from '../../../components/UIComponents';
import AppointmentPeriod from './AppointmentPeriod';
import Sorting from './Sorting';
import { FieldContainer } from '../styledComponents';
import { Collapse } from "antd";
const { Panel } = Collapse;

function CollapsibleSection({ t, resetSearch }) {
  return (
    <>
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
    </>
  )
}

function Search({ t, searchProps, screenWidth }) {
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
    <HorizontalCard variant="searchBar">
      <FormProvider {...methods}>
        <form>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <FieldContainer flex="10%">
              <PlaceAutocomplete
                name="googlePlaceAddress"
                setLoading={setLoading}
                setZoom={setZoom}
                setCenter={setCenter}
                emptyOtherFilters={() => reset(defaultValues)}
              />
            </FieldContainer>

            {screenWidth >= 915 ?
              <CollapsibleSection t={t} resetSearch={resetSearch} />
              :
              <Collapse defaultActiveKey={[]} ghost>
                <Panel key="1" showArrow={false} header="More">
                  <CollapsibleSection t={t} resetSearch={resetSearch} />
                </Panel>
              </Collapse>
            }
          </div>
        </form>
      </FormProvider>
    </HorizontalCard>
  );
}

export default Search;
import React from 'react';

import { themeColor } from '../../style/theme';
import ScreenWidthListener from '../../components/Layout/ScreenWidthListener';
import { PlaceAutocomplete } from '../../components/Google';
import { DateRange } from '../../components/FormComponents';
import { ContainedButton, HorizontalCard } from '../../components/UIComponents';
import {
  MainContainer,
  RelaxCatContainer,
  FormContainer,
  FieldContainer
} from './styledComponents'

import { useHome } from './viewModel'

function Home() {
  const { screenWidth } = ScreenWidthListener();

  const {
    t,
    FormProvider,
    methods,
    onSubmit,
    setCenter,
    setZoom,
    horizontalCatRef,
    verticalCatRef
  } = useHome()

  const { handleSubmit } = methods;

  return (
    <MainContainer>
      <RelaxCatContainer>
        <div className="cat-horizontal" ref={horizontalCatRef} />
      </RelaxCatContainer>

      <HorizontalCard style={{ width: '100%' }}>
        <h5 style={{ color: themeColor.grey, fontSize: '1.3rem' }}>{t('home.find_sitter')}</h5>
        <br />

        <FormProvider {...methods}>
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <FieldContainer>
              <PlaceAutocomplete
                name="googlePlaceAddress"
                setCenter={setCenter}
                setZoom={setZoom}
                style={{ height: 40 }}
              />
            </FieldContainer>

            {screenWidth > 650 &&
              <FieldContainer>
                <DateRange />
              </FieldContainer>
            }

            <ContainedButton
              type="input"
              aria-label="search"
              style={{ height: 40, margin: 0 }}
            >
              <i className="fas fa-search" />
            </ContainedButton>
          </FormContainer>
        </FormProvider>
      </HorizontalCard>

      <div style={{ width: '95%', margin: '20px auto 0 auto' }}>
        <div className="card_sphynx" />
      </div>
    </MainContainer>
  )
}

export default Home;

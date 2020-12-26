import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { PlaceAutocomplete } from '../../components/Google'
import { ContainedButton, HorizontalCard } from '../../components/UIComponents'
import ScreenWidthListener from '../../components/Layout/ScreenWidthListener'
import AppointmentPeriodPicker from '../FindCatSitter/Search/AppointmentPeriodPicker';
// import { checkToken } from '../../redux/app/actions'
import { useDispatch } from 'react-redux';

import { useHome } from './viewModel'
import { MainContainer, RelaxCatContainer, FormContainer, FieldContainer } from './styledComponents'

function Home() {
  const { screenWidth } = ScreenWidthListener();
  const dispatch = useDispatch();

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
        <h5>{t('home.find_sitter')}</h5>
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
                <AppointmentPeriodPicker t={t} style={{ height: 40 }} />
              </FieldContainer>
            }

            <ContainedButton type="input" style={{ height: 40, margin: 0 }}>
              <i className="fas fa-search" />
            </ContainedButton>
          </FormContainer>
        </FormProvider>
      </HorizontalCard>

      <div style={{ width: '95%', margin: '20px auto 0 auto' }}>
        <div className="card_sphynx" />
      </div>

      {/* <button type="button" onClick={() => {
        dispatch(checkToken())
        console.log('helo')
      }}>
        test API
        </button> */}

    </MainContainer>
  )
}

export default Home;

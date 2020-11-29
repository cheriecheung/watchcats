import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { PlaceAutocomplete } from '../../components/Google'
import { HorizontalCard } from '../../components/UIComponents'
import AppointmentPeriodPicker from '../FindCatSitter/Search/AppointmentPeriodPicker';
import { checkToken } from '../../redux/actions/authenticationActions'

import { useHome } from './viewModel'

import styled from 'styled-components'

const MainContainer = styled.div`
  padding: 40px 0 50px 0;
  width: 1200px !important;
  margin: 0 auto;

  @media (max-width: 1220px) {
    padding: 40px 100px 50px 100px;
    width: unset;
  }
  
  @media (max-width: 1090px) {
    padding: 40px 50px 50px 50px;
  }

  @media (max-width: 890px) {
    padding: 40px 50px 50px 50px;
  }

  @media (max-width: 500px) {
    padding: 40px 4vw 50px 4vw;
  }
`

function Home() {
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
      {/* <button type="button" onClick={() => dispatch(checkToken())}>
        test API
        </button> */}

      <div style={{ display: 'flex', width: '950px', justifyContent: 'flex-end', position: 'absolute' }}>
        <div className="cat_horizontal" ref={horizontalCatRef} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
        <div className="cat_vertical" ref={verticalCatRef} />
        <HorizontalCard>
          <h5>Find a cat sitter in your area</h5>
          <br />

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <PlaceAutocomplete
                name="googlePlaceAddress"
                setCenter={setCenter}
                setZoom={setZoom}
              />
              <AppointmentPeriodPicker t={t} />

              <button type="input">
                <i className="fas fa-search" />
              </button>
            </form>
          </FormProvider>
        </HorizontalCard>
        <div className="cat_vertical" style={{ opacity: 0 }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <div className="card_sphynx" />
        <div className="card_longhair" />
      </div>
    </MainContainer>
  )
}

export default Home;

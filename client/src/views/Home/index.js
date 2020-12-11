import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { PlaceAutocomplete } from '../../components/Google'
import { ContainedButton, HorizontalCard } from '../../components/UIComponents'
import ScreenWidthListener from '../../components/Layout/ScreenWidthListener'
import AppointmentPeriodPicker from '../FindCatSitter/Search/AppointmentPeriodPicker';
// import { checkToken } from '../../redux/app/actions'
import { useDispatch } from 'react-redux';

import { useHome } from './viewModel'

import styled from 'styled-components'

const MainContainer = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  margin: 0 auto;
  padding: 150px 0 50px 0;

  @media (max-width: 850px) {
    padding: 150px 50px 50px 50px;
    width: unset;
  }

  @media (max-width: 500px) {
    padding: 150px 4vw 50px 4vw;
  }
`

const RelaxCatContainer = styled.div`
  position: absolute;
  display: flex; 
  justify-content: flex-end;
  width: 830px; 

  @media (max-width: 850px) {
    width: 90%; 
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`

const FormContainer = styled.form`
  display: flex; 
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 650px) {
    flex-direction: column;
  }
`

const FieldContainer = styled.div`
  flex-basis: 42%;
  margin-right: 10px;

  @media (max-width: 650px) {
    flex-basis: unset;
    margin-right: 0;
    margin-bottom: 15px;
  }
`

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
        <h5>Find a cat sitter in your area</h5>
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
        {/* <div className="card_longhair" /> */}
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

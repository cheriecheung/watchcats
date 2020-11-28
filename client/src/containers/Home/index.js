import React from 'react';
import { Link, useHistory } from 'react-router-dom';
// import { useSpring, animated } from 'react-spring';
import { PlaceAutocomplete } from '../../components/Google'
import { HorizontalCard } from '../../components/UIComponents'
import AppointmentPeriodPicker from '../FindCatSitter/Search/AppointmentPeriodPicker';
import { checkToken } from '../../redux/actions/authenticationActions'

import { useHome } from './viewModel'

import styled from 'styled-components'

const MainContainer = styled.div`
  padding: 40px 0 50px 0;
  width: 900px !important;
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
  } = useHome()

  const { handleSubmit } = methods;

  return (
    <MainContainer>
      {/* <button type="button" onClick={() => dispatch(checkToken())}>
        test API
        </button> */}

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
    </MainContainer>
  )
}

// const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
// //const trans2 = (x, y) => `translate3d(${x / 3.5}px,${y / 3.5}px,0)`;
// const trans2 = (x, y) => `translate3d(${-x / 30}px,${y / 20}px,0)`;
// const trans3 = (x, y) => `translate3d(${x / 20}px,${y / 25}px,0)`;
// const trans4 = (x, y) => `translate3d(${x / 20}px,${y / 25}px,0)`;
// const trans_jump = (x, y) => `translate3d(${x / 20}px,${y / 5}px,0)`;

// function Home() {
//   const [props, set] = useSpring(() => ({
//     xy: [0, 0],
//     config: { mass: 10, tension: 550, friction: 140 },
//   }));
//   const { t, i18n } = useTranslation();

//   return (
//     <>
//       <h3>{t('home.i_am')}</h3>
//       <animated.div
//         className="card_sphynx"
//         //style={{
//         //  transform: props.xy.interpolate(trans4),
//         //}}
//       />
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           marginTop: 100,
//         }}
//         onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
//       >
//         <animated.div
//           className="card2"
//           style={{
//             transform: props.xy.interpolate(trans2),
//           }}
//         />

//         <Link
//           to="/find"
//           style={{
//             border: '2px solid #f0f0f0',
//             width: '25vw',
//             height: '13vw',
//             marginRight: 20,
//             padding: 30,
//             display: 'flex',
//           }}
//         >
//           <h5 style={{ alignSelf: 'center' }}>
//             {t('home.owner_finds_sitter')}
//           </h5>
//         </Link>

//         <animated.div
//           className="card_scottish_fold"
//           //style={{
//           //  transform: props.xy.interpolate(trans3),
//           //}}
//         />

//         <Link
//           to="/find"
//           style={{
//             border: '2px solid #f0f0f0',
//             width: '25vw',
//             height: '13vw',
//             padding: 30,
//             display: 'flex',
//           }}
//         >
//           <h5 style={{ alignSelf: 'center' }}>
//             {t('home.sitter_finds_owner')}
//           </h5>
//         </Link>
//         <animated.div
//           className="card_jump"
//           style={{
//             transform: props.xy.interpolate(trans_jump),
//           }}
//         />
//       </div>
//     </>
//   );
// }

export default Home;

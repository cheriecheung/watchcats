import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
// import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { GooglePlaceAutocomplete } from '../../components/FormComponents'
import AppointmentPeriodPicker from '../FindCatSitter/Search/AppointmentPeriodPicker';
import { appointmentTypeOptions } from '../../constants'
import { yupResolver } from '@hookform/resolvers/yup';
import { homeSearchSchema } from '../Account/_validationSchema'

const SearchContainer = styled.div`
  text-align: left;
  margin-bottom: 25px;
  border-radius: 10px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.05), 0 1px 6px rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 1);

  display: flex;
  flex-direction: column;
  padding: 2px 25px;
`;

const Form = styled.form`
  width: 100%;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  const resolver = yupResolver(cat_sitter_schema)

`

const resolver = yupResolver(homeSearchSchema)

const defaultValues = {
  googlePlaceAddress: '',
  startDate: '',
  endDate: ''
}

function Home() {
  const history = useHistory();

  const methods = useForm({ defaultValues, resolver });
  const { handleSubmit, errors } = methods;

  useEffect(() => {
    console.log({ errors })
  }, [errors])

  const sendData = (data) => {
    const { googlePlaceAddress, startDate, endDate } = data
    history.push({ pathname: "/find", state: { googlePlaceAddress, startDate, endDate } });
  };

  return (
    <div style={{ padding: '80px 40px 25px 40px' }}>
      <SearchContainer>
        <h5>Find a cat sitter in your area</h5>

        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(sendData)}>
            <GooglePlaceAutocomplete name="googlePlaceAddress" />
            <AppointmentPeriodPicker />

            <button type="submit">
              <i className="fas fa-search" />
            </button>
          </Form>
        </FormProvider>
      </SearchContainer>
    </div>
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

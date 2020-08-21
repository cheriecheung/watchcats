// import React, { useState, useEffect, useRef } from 'react';
// import { useTranslation } from 'react-i18next';
// import { DatePicker } from 'antd';
// import 'antd/dist/antd.css';
// import { themeColor } from '../../style/theme';

// function Search({ setCenter, reset, setReset }) {
//   const { t, i18n } = useTranslation();
//   const [openStartDate, setOpenStartDate] = useState(false);
//   const [startDate, setStartDate] = useState('');
//   const [openEndDate, setOpenEndDate] = useState(false);
//   const [endDate, setEndDate] = useState('');

//   useEffect(() => {
//     if (openStartDate) {
//       setOpenEndDate(false);
//     }
//   }, [openStartDate]);

//   useEffect(() => {
//     if (openEndDate) {
//       setOpenStartDate(false);
//     }
//   }, [openEndDate]);

//   const pickerFooter = (type) => {
//     return (
//       <button
//         style={{
//           background: 'transparent',
//           border: 'none',
//           float: 'left',
//           position: 'absolute',
//         }}
//         onClick={() => {
//           if (type === 'startDate') {
//             setStartDate('');
//             setOpenStartDate(false);
//           } else {
//             setEndDate('');
//             setOpenEndDate(false);
//           }
//         }}
//       >
//         CLEAR
//       </button>
//     );
//   };

//   return (
//     <div
//       style={{
//         height: 100,
//         background: '#F8F8F8',
//         borderBottom: `1px solid ${themeColor.peach}`,
//         display: 'flex',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//       }}
//     >
//       <GooglePlaceAutoComplete
//         setCenter={setCenter}
//         reset={reset}
//         setReset={setReset}
//       />
//       <div
//         style={{
//           marginTop: -10,
//           width: 130,
//           display: 'flex',
//           justifyContent: 'space-between',
//         }}
//       >
//         <div>
//           <button
//             style={{
//               background: '#a0dfcf',
//               border: 'none',
//               padding: 10,
//               position: 'absolute',
//               outline: 'none',
//               width: 100,
//             }}
//             onClick={() => setOpenStartDate(!openStartDate)}
//           >
//             {startDate !== '' ? startDate : 'Start date'}
//           </button>
//           <DatePicker
//             style={{ width: 0, zIndex: -1 }}
//             open={openStartDate}
//             renderExtraFooter={() => pickerFooter('startDate')}
//             format="DD-MM-YY"
//             onChange={(date, dateString) => {
//               setStartDate(dateString);
//               setOpenStartDate(false);
//             }}
//           />
//         </div>

//         <div>
//           <button
//             style={{
//               background: '#a0dfcf',
//               border: 'none',
//               padding: 10,
//               position: 'absolute',
//               outline: 'none',
//               width: 100,
//             }}
//             onClick={() => setOpenEndDate(!openEndDate)}
//           >
//             {endDate !== '' ? endDate : 'End date'}
//           </button>
//           <DatePicker
//             style={{ width: 0, zIndex: -1 }}
//             open={openEndDate}
//             renderExtraFooter={() => pickerFooter('endDate')}
//             format="DD-MM-YY"
//             onChange={(date, dateString) => {
//               setEndDate(dateString);
//               setOpenEndDate(false);
//             }}
//           />
//         </div>
//       </div>

//       <button
//         style={{
//           background: '#a0dfcf',
//           border: 'none',
//           padding: 10,
//           outline: 'none',
//         }}
//       >
//         About my cat(s)
//       </button>

//       <button
//         style={{
//           background: '#a0dfcf',
//           border: 'none',
//           padding: 10,
//           outline: 'none',
//         }}
//       >
//         Requirement
//       </button>
//     </div>
//   );
// }

// export default Search;

// const GooglePlaceAutoComplete = ({ setCenter, reset, setReset }) => {
//   let autoComplete;
//   // const { google } = window;
//   // const google = (window.google = window.google ? window.google : {});

//   const [address, setAddress] = useState('');
//   const autoCompleteRef = useRef(null);

//   const handlePlaceSelect = async (udpateAddress) => {
//     const addressObject = autoComplete.getPlace();
//     const newAddress = addressObject.formatted_address;
//     udpateAddress(newAddress);

//     const lat = addressObject.geometry.location.lat();
//     const lng = addressObject.geometry.location.lng();

//     setCenter({ lat, lng });
//     setReset(true);
//   };

//   const handleScriptLoad = (updateAddress, ref) => {
//     autoComplete = new window.google.maps.places.Autocomplete(ref.current, {
//       componentRestrictions: { country: 'nl' },
//     });
//     autoComplete.setFields([
//       'address_components',
//       'formatted_address',
//       'geometry',
//     ]);
//     autoComplete.addListener('place_changed', () =>
//       handlePlaceSelect(updateAddress)
//     );
//   };

//   useEffect(() => {
//     handleScriptLoad(setAddress, autoCompleteRef);
//   }, []);

//   useEffect(() => {
//     if (reset === false) {
//       setAddress('');
//     }
//   }, [reset]);

//   return (
//     <input
//       ref={autoCompleteRef}
//       onChange={(e) => setAddress(e.target.value)}
//       value={address}
//       type="text"
//       placeholder="Where would you like to search?"
//       className="find-sitter-by-address"
//       style={{ outline: 'none', padding: '5px 10px', width: 200 }}
//     />
//   );
// };

import React, { useState, useEffect, useRef } from 'react';
import { Row, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import {
  DatePicker,
  FieldLabel,
  RadioGroup,
  RadioButton,
} from '../../components/FormComponents';
import { useForm, FormProvider } from 'react-hook-form';
import 'antd/dist/antd.css';
import { themeColor } from '../../style/theme';

function Search({ setCenter }) {
  const { t, i18n } = useTranslation();
  const methods = useForm();
  const { register, control, handleSubmit, reset, watch } = methods;

  const [openStartDate, setOpenStartDate] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [openEndDate, setOpenEndDate] = useState(false);
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (openStartDate) {
      setOpenEndDate(false);
    }
  }, [openStartDate]);

  useEffect(() => {
    if (openEndDate) {
      setOpenStartDate(false);
    }
  }, [openEndDate]);

  const pickerFooter = (type) => {
    return (
      <button
        style={{
          background: 'transparent',
          border: 'none',
          float: 'left',
          position: 'absolute',
        }}
        onClick={() => {
          if (type === 'startDate') {
            setStartDate('');
            setOpenStartDate(false);
          } else {
            setEndDate('');
            setOpenEndDate(false);
          }
        }}
      >
        CLEAR
      </button>
    );
  };

  const sendData = (data) => {
    console.log(data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(sendData)}
          style={{
            minHeight: 100,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Row style={{ width: '100%', margin: '0 5px' }}>
            <Col md={3} className="mb-3">
              <GooglePlaceAutoComplete setCenter={setCenter} />
            </Col>
            <Col md={4} className="mb-3">
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div
                  className="d-flex flex-column date-picker"
                  style={{ flexBasis: '45%', minWidth: 200 }}
                >
                  <DatePicker name="startDate" placeholder="Start date" />
                </div>
                <i className="fas fa-arrow-right align-self-center" />
                <div
                  className="d-flex flex-column date-picker"
                  style={{ flexBasis: '45%' }}
                >
                  <DatePicker name="endDate" placeholder="End date" />
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-3">
              <RadioGroup name="sortBy">
                <RadioButton value="reviews" style={{ marginRight: 5 }}>
                  <i className="fas fa-comment-dots fa-lg icon-sort" />
                  <span>Review</span>
                </RadioButton>
                <RadioButton value="Distance" style={{ marginRight: 5 }}>
                  <i className="fas fa-road fa-lg icon-sort" />
                  <span>Distance</span>
                </RadioButton>
                <RadioButton value="price">
                  <i className="fas fa-dollar-sign fa-lg icon-sort" />
                  <span>Price</span>
                </RadioButton>
              </RadioGroup>
            </Col>
            <Col md={1} className="mb-3" style={{ alignSelf: 'center' }}>
              <button
                style={{ background: 'none', outline: 'none', border: 'none' }}
              >
                Reset
              </button>
            </Col>
          </Row>

          {/* <div
      style={{
        height: 100,
        background: '#F8F8F8',
        borderBottom: `1px solid ${themeColor.peach}`,
        display: 'flex',
        // justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <GooglePlaceAutoComplete
        setCenter={setCenter}
      />

      <div
        style={{
          marginTop: -10,
          width: 130,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <button
            style={{
              background: '#a0dfcf',
              border: 'none',
              padding: 10,
              position: 'absolute',
              outline: 'none',
              width: 100,
            }}
            onClick={() => setOpenStartDate(!openStartDate)}
          >
            {startDate !== '' ? startDate : 'Start date'}
          </button>
          <DatePicker
            style={{ width: 0, zIndex: -1 }}
            open={openStartDate}
            renderExtraFooter={() => pickerFooter('startDate')}
            format="DD-MM-YY"
            onChange={(date, dateString) => {
              setStartDate(dateString);
              setOpenStartDate(false);
            }}
          />
        </div>

        <div>
          <button
            style={{
              background: '#a0dfcf',
              border: 'none',
              padding: 10,
              position: 'absolute',
              outline: 'none',
              width: 100,
            }}
            onClick={() => setOpenEndDate(!openEndDate)}
          >
            {endDate !== '' ? endDate : 'End date'}
          </button>
          <DatePicker
            style={{ width: 0, zIndex: -1 }}
            open={openEndDate}
            renderExtraFooter={() => pickerFooter('endDate')}
            format="DD-MM-YY"
            onChange={(date, dateString) => {
              setEndDate(dateString);
              setOpenEndDate(false);
            }}
          />
        </div>
      </div>

      <button
        style={{
          background: '#a0dfcf',
          border: 'none',
          padding: 10,
          outline: 'none',
        }}
      >
        About my cat(s)
      </button>

      <button
        style={{
          background: '#a0dfcf',
          border: 'none',
          padding: 10,
          outline: 'none',
        }}
      >
        Requirement
      </button>
    </div> */}
        </form>
      </FormProvider>
    </>
  );
}

export default Search;

const GooglePlaceAutoComplete = ({ setCenter }) => {
  let autoComplete;
  // const { google } = window;
  // const google = (window.google = window.google ? window.google : {});

  const [address, setAddress] = useState('');
  const autoCompleteRef = useRef(null);

  // const handlePlaceSelect = async (udpateAddress) => {
  //   const addressObject = autoComplete.getPlace();
  //   const newAddress = addressObject.formatted_address;
  //   udpateAddress(newAddress);

  //   const lat = addressObject.geometry.location.lat();
  //   const lng = addressObject.geometry.location.lng();

  //   setCenter({ lat, lng });
  // };

  // const handleScriptLoad = (updateAddress, ref) => {
  //   autoComplete = new window.google.maps.places.Autocomplete(ref.current, {
  //     componentRestrictions: { country: 'nl' },
  //   });
  //   autoComplete.setFields([
  //     'address_components',
  //     'formatted_address',
  //     'geometry',
  //   ]);
  //   autoComplete.addListener('place_changed', () =>
  //     handlePlaceSelect(updateAddress)
  //   );
  // };

  // useEffect(() => {
  //   handleScriptLoad(setAddress, autoCompleteRef);
  // }, []);

  // useEffect(() => {
  //   if (reset === false) {
  //     setAddress('');
  //   }
  // }, [reset]);

  return (
    <input
      ref={autoCompleteRef}
      onChange={(e) => setAddress(e.target.value)}
      value={address}
      type="text"
      placeholder="Address"
      className="form-control"
      style={{ outline: 'none', paddingLeft: 10 }}
    />
  );
};
